import { copyFile, mkdir, stat } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import process from "node:process";

import { formatError, moduleMetrics, sha256, usage, essayPath } from "./author-utils.mjs";
import { readFile, readdir } from "node:fs/promises";
import { spawn } from "node:child_process";

function runBuild() {
  return new Promise((resolveBuild, reject) => {
    const child = spawn("pnpm", ["build"], { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolveBuild() : reject(new Error("pnpm build failed")),
    );
  });
}

export async function exportFiles(researchPath) {
  const directory = resolve(researchPath, "exports");
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => join(directory, entry.name))
    .sort();
}

export async function syncExports(slug, researchPath, root = resolve(".")) {
  const files = await exportFiles(researchPath);
  if (files.length === 0) throw new Error("Research repository exports folder contains no JSON files.");
  const destination = join(root, "src/content/essays", slug, "data");
  await stat(destination);
  await mkdir(destination, { recursive: true });
  const results = [];
  for (const source of files) {
    const destinationFile = join(destination, basename(source));
    const buffer = await readFile(source);
    await copyFile(source, destinationFile);
    const parsed = JSON.parse(buffer);
    const records = Array.isArray(parsed.points) ? parsed.points : [];
    results.push({
      file: basename(source),
      sha256: sha256(buffer),
      candidate: records.filter((record) => record.status === "candidate").length,
      verified: records.filter((record) => record.status === "verified").length,
    });
  }
  await runBuild();
  const metrics = await moduleMetrics(essayPath(slug), results.map((result) => `${slug}/${result.file}`));
  return { results, metrics };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.length !== 4) {
    console.error(usage("pnpm sync:data", "<slug> <research-repo-path>"));
    process.exitCode = 1;
  } else {
    try {
      const result = await syncExports(process.argv[2], process.argv[3]);
      for (const file of result.results) {
        console.log(
          `${file.file} sha256=${file.sha256} candidate=${file.candidate} verified=${file.verified}`,
        );
      }
      console.log("Module data copied; validation build passed. Run pnpm essay:check <slug>, then review every candidate record before publication.");
    } catch (error) {
      console.error(`sync:data failed: ${formatError(error)}`);
      process.exitCode = 1;
    }
  }
}

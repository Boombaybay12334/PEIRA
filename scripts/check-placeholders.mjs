import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import process from "node:process";

const markerPattern = /AUTHOR:|FILL_ME/;

async function essayFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await essayFiles(path)));
    } else if (entry.isFile() && path.endsWith(".mdx")) {
      files.push(path);
    }
  }

  return files;
}

export function hasPublishedPlaceholder(content) {
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/u)?.[1] ?? "";
  return /^draft:\s*false\s*$/mu.test(frontmatter) && markerPattern.test(content);
}

export async function findPublishedPlaceholders(root = "src/content/essays") {
  const files = await essayFiles(root);
  const invalid = [];

  for (const file of files) {
    if (hasPublishedPlaceholder(await readFile(file, "utf8"))) {
      invalid.push(relative(process.cwd(), file));
    }
  }

  return invalid;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = process.argv[2] === "--" ? process.argv[3] : process.argv[2];
  const invalid = await findPublishedPlaceholders(root ?? "src/content/essays");
  if (invalid.length > 0) {
    process.stderr.write(`Published essays contain placeholders:\n${invalid.join("\n")}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write("No placeholders found in published essays.\n");
  }
}

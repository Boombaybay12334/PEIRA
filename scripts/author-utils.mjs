import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { parse } from "yaml";

export const repoRoot = resolve(".");
export const essaysRoot = join(repoRoot, "src/content/essays");

export function usage(command, text) {
  return `Usage: ${command} ${text}`;
}

export function parseEssay(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/u);
  if (!match) throw new Error("Essay is missing YAML frontmatter");
  return { data: parse(match[1]), body: match[2] };
}

export function wordCount(text) {
  return text.match(/\b[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*\b/gu)?.length ?? 0;
}

export function readingMinutes(text) {
  return Math.max(1, Math.ceil(wordCount(text) / 220));
}

export function hasAuthorMarker(value) {
  return /AUTHOR:|AUTHOR-REPLACE|FILL_ME/u.test(value);
}

export function essayPath(slug) {
  return join(essaysRoot, slug);
}

export async function listEssaySlugs() {
  const entries = await readdir(essaysRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();
}

export async function readEssay(slug) {
  const path = join(essayPath(slug), "index.mdx");
  return { path, content: await readFile(path, "utf8") };
}

export function moduleReferences(body) {
  return [...body.matchAll(/\bdata="([^"]+\.json)"/gu)].map((match) => match[1]);
}

export function moduleMetrics(essayDir, references) {
  return Promise.all(
    references.map(async (reference) => {
      const path = join(essayDir, "data", reference.split("/").pop());
      const data = JSON.parse(await readFile(path, "utf8"));
      const records = Array.isArray(data.points) ? data.points : [];
      return {
        reference,
        file: reference.split("/").pop(),
        records: records.length,
        candidates: records.filter((record) => record.status === "candidate").length,
        demos: data.demo === true
          ? records.length
          : records.filter((record) => record.demo === true).length,
      };
    }),
  );
}

export function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

export function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}

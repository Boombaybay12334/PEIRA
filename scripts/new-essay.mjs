import { access, copyFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

import {
  formatError,
  repoRoot,
  usage,
} from "./author-utils.mjs";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const sections = [
  ["Introduction", "AUTHOR: write the introduction."],
  ["Evidence", "AUTHOR: add sourced evidence."],
  ["Analysis", "AUTHOR: explain the analysis."],
  ["Limitations", "AUTHOR: describe limitations."],
];

export function isValidSlug(slug) {
  return slugPattern.test(slug);
}

export function essayTemplate(slug, title, date = new Date().toISOString().slice(0, 10)) {
  const body = sections
    .map(([heading, marker]) => `## ${heading}\n\n{/* ${marker} */}`)
    .join("\n\n");
  return `---
title: "${title.replaceAll('"', '\\"')}"
slug: ${slug}
description: "AUTHOR: write a 50–200 character description for this essay."
publishDate: "${date}"
topics: [wars]
lens: [ai]
heroImage:
  src: "/favicon.svg"
  alt: "AUTHOR: describe the hero image."
  caption: "AUTHOR: write the image caption."
  credit: "AUTHOR: add image credit."
  license: "AUTHOR: add image license."
sources:
  - title: "AUTHOR: add a source you have read."
    kind: web
    url: "https://github.com/Boombaybay12334/AUTHOR-REPLACE"
repoUrl: "https://github.com/Boombaybay12334/AUTHOR-REPLACE"
lab:
  method: "AUTHOR: describe the method."
  limitations: "AUTHOR: describe the limitations."
  dataSources: ["AUTHOR: list the data source."]
  reproducibility:
    - item: "AUTHOR: add a reproducibility check."
      done: false
draft: true
---

${body}
`;
}

export async function createEssay(slug, title, root = repoRoot) {
  if (!isValidSlug(slug)) throw new Error("Slug must be lowercase kebab-case.");
  if (!title?.trim()) throw new Error("Title is required.");
  const directory = join(root, "src/content/essays", slug);
  try {
    await access(directory);
    throw new Error(`Essay already exists: ${slug}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }

  await mkdir(join(directory, "data"), { recursive: true });
  await mkdir(join(directory, "images"), { recursive: true });
  await writeFile(join(directory, "index.mdx"), essayTemplate(slug, title), "utf8");
  await copyFile(join(root, "public/favicon.svg"), join(directory, "images/hero-placeholder.svg"));
  return directory;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.length < 4) {
    console.error(usage("pnpm new:essay", '<slug> "<Title>"'));
    process.exitCode = 1;
  } else {
    try {
      const directory = await createEssay(process.argv[2], process.argv.slice(3).join(" "));
      console.log(`Created ${directory}`);
    } catch (error) {
      console.error(`new:essay failed: ${formatError(error)}`);
      process.exitCode = 1;
    }
  }
}

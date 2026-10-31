/* eslint-disable no-console */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));
const colorLiteral = /#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})\b|(?:rgb|rgba|hsl|hsla)\(\s*\d/i;
const violations = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }

    if (path.endsWith("src/styles/tokens.css")) {
      continue;
    }

    const contents = await readFile(path, "utf8");
    if (colorLiteral.test(contents)) {
      violations.push(path);
    }
  }
}

await walk(sourceRoot);

if (violations.length > 0) {
  console.error("Hardcoded color literals found outside src/styles/tokens.css:");
  for (const path of violations) {
    console.error(`- ${path}`);
  }
  globalThis.process.exitCode = 1;
} else {
  console.log("No hardcoded color literals found outside src/styles/tokens.css.");
}

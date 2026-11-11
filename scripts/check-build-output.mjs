/* eslint-disable no-console */
import { existsSync } from "node:fs";
import { join } from "node:path";

const outputDirectory = process.argv[2] ?? "dist";
const expectedDraftEssay = process.env.PEIRA_EXPECT_DRAFTS === "1";
const essayRoute = join(outputDirectory, "essays", "leipzig-1813", "index.html");

if (!existsSync(join(outputDirectory, "index.html"))) {
  console.error(`Missing build output: ${outputDirectory}/index.html`);
  process.exit(1);
}

const hasDraftEssay = existsSync(essayRoute);
if (hasDraftEssay !== expectedDraftEssay) {
  console.error(
    expectedDraftEssay
      ? `Expected draft essay route in ${outputDirectory}, but it was not found.`
      : `Draft essay route must not exist in ${outputDirectory}.`,
  );
  process.exit(1);
}

console.log(
  expectedDraftEssay
    ? `QA build includes /essays/leipzig-1813/.`
    : `Deploy build excludes /essays/leipzig-1813/.`,
);

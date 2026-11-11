import process from "node:process";

import {
  essayPath,
  formatError,
  hasAuthorMarker,
  listEssaySlugs,
  moduleMetrics,
  parseEssay,
  readingMinutes,
  readEssay,
  usage,
  wordCount,
} from "./author-utils.mjs";

function statusRow(slug, content) {
  const { data, body } = parseEssay(content);
  return { slug, data, body };
}

export async function getEssayStatus(slug, rootSlugs = listEssaySlugs()) {
  const slugs = slug ? [slug] : await rootSlugs;
  if (slugs.length === 0) throw new Error("No essays found.");
  const rows = [];
  for (const current of slugs) {
    const { content } = await readEssay(current);
    const row = statusRow(current, content);
    const modules = await moduleMetrics(essayPath(current), [
      ...row.body.matchAll(/\bdata="([^"]+\.json)"/gu),
    ].map((match) => match[1]));
    const reproducibility = row.data.lab.reproducibility ?? [];
    rows.push({
      slug: current,
      state: row.data.draft ? "draft" : "published",
      words: wordCount(row.body),
      readingTime: readingMinutes(row.body),
      markers: (row.body.match(/AUTHOR:|AUTHOR-REPLACE|FILL_ME/gu) ?? []).length,
      sources: row.data.sources?.length ?? 0,
      reproducibility: `${reproducibility.filter((item) => item.done).length}/${reproducibility.length}`,
      modules,
      heroLicense: Boolean(row.data.heroImage?.license && !hasAuthorMarker(row.data.heroImage.license)),
      blockers: [
        row.data.draft ? "draft is true" : null,
        hasAuthorMarker(row.data.description) ? "description has AUTHOR marker" : null,
        row.data.sources?.some((source) => hasAuthorMarker(JSON.stringify(source)))
          ? "sources have AUTHOR markers"
          : null,
        row.data.lab?.reproducibility?.some((item) => !item.done)
          ? "reproducibility checks are open"
          : null,
        modules.some((module) => module.candidates > 0 || module.demos > 0)
          ? "module data contains candidate/demo records"
          : null,
        !(row.data.heroImage?.license && !hasAuthorMarker(row.data.heroImage.license))
          ? "hero image licence is missing or unfinished"
          : null,
        row.body.match(/AUTHOR:|AUTHOR-REPLACE|FILL_ME/u) ? "body has placeholders" : null,
      ].filter(Boolean),
    });
  }
  return rows;
}

export function renderStatus(rows) {
  const lines = [
    "SLUG | STATE | WORDS | READ | AUTHOR | SOURCES | REPRO | HERO LICENCE | MODULE DATA",
  ];
  for (const row of rows) {
    const moduleText = row.modules.length
      ? row.modules
          .map(
            (module) =>
              `${module.file} (${module.records} records; ${module.candidates} candidate; ${module.demos} demo)`,
          )
          .join(", ")
      : "none";
    lines.push(
      `${row.slug} | ${row.state} | ${row.words} | ${row.readingTime} min | ${row.markers} | ${row.sources} | ${row.reproducibility} | ${row.heroLicense ? "filled" : "unfinished"} | ${moduleText}`,
    );
    lines.push(
      row.blockers.length ? `BLOCKERS: ${row.blockers.join("; ")}` : "READY TO PUBLISH",
    );
  }
  return lines.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    if (process.argv.length > 3) {
      console.error(usage("pnpm essay:status", "[slug]"));
      process.exitCode = 1;
    } else {
      console.log(renderStatus(await getEssayStatus(process.argv[2])));
    }
  } catch (error) {
    console.error(`essay:status failed: ${formatError(error)}`);
    process.exitCode = 1;
  }
}

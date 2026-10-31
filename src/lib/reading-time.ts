const FRONTMATTER = /^---[\s\S]*?---/;
const FENCED_CODE = /```[\s\S]*?```/g;
const IMPORT_EXPORT = /^\s*(?:import|export)\b.*$/gm;
const JSX_TAGS = /<\/?[A-Za-z][^>]*>/g;

export function readingTime(body: string): number {
  const prose = body
    .replace(FRONTMATTER, "")
    .replace(FENCED_CODE, "")
    .replace(IMPORT_EXPORT, "")
    .replace(JSX_TAGS, " ");
  const words = prose.match(/\b[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*\b/gu) ?? [];

  return Math.max(1, Math.ceil(words.length / 220));
}

import { getCollection } from "astro:content";

export function getPublishedEssays() {
  return getCollection(
    "essays",
    ({ data }) => !data.draft || process.env.PEIRA_INCLUDE_DRAFTS === "1",
  );
}

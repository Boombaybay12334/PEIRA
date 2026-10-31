import { getCollection } from "astro:content";

export function getPublishedEssays() {
  return getCollection("essays", ({ data }) => !import.meta.env.PROD || !data.draft);
}

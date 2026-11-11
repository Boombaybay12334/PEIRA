import rss from "@astrojs/rss";

import { getPublishedEssays } from "../content/queries";
import { sortNewestFirst } from "../lib/essays";

export async function GET(context) {
  const essays = sortNewestFirst(await getPublishedEssays());

  return rss({
    title: "PEIRA",
    description: "Research-led essays about history, conflict, archaeology, and uncertainty.",
    site: context.site,
    items: essays.map((essay) => ({
      title: essay.data.title,
      link: `/essays/${essay.data.slug}/`,
      pubDate: essay.data.publishDate,
      description: essay.data.description,
    })),
  });
}

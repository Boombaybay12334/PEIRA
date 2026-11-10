export interface SortableEssay {
  data: {
    publishDate: Date;
  };
}

export type EssayTopic = "wars" | "artifacts" | "paleo-bio";

export interface TopicEssay {
  data: {
    topics: readonly EssayTopic[];
  };
}

export function sortNewestFirst<T extends SortableEssay>(essays: T[]): T[] {
  return [...essays].sort(
    (left, right) => right.data.publishDate.getTime() - left.data.publishDate.getTime(),
  );
}

export function filterByTopic<T extends TopicEssay>(essays: T[], topic: EssayTopic): T[] {
  return essays.filter((essay) => essay.data.topics.includes(topic));
}

export function groupByYear<T extends SortableEssay>(essays: T[]): Map<number, T[]> {
  const groups = new Map<number, T[]>();

  for (const essay of sortNewestFirst(essays)) {
    const year = essay.data.publishDate.getUTCFullYear();
    const yearGroup = groups.get(year) ?? [];
    yearGroup.push(essay);
    groups.set(year, yearGroup);
  }

  return groups;
}

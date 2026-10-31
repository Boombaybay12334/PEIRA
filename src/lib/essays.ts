export interface SortableEssay {
  data: {
    publishDate: Date;
  };
}

export function sortNewestFirst<T extends SortableEssay>(essays: T[]): T[] {
  return [...essays].sort(
    (left, right) => right.data.publishDate.getTime() - left.data.publishDate.getTime(),
  );
}

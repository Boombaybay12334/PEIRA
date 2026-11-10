import type { Point } from "./schemas";

export function filterPointsUpTo(points: Point[], date: Date) {
  return points.filter((point) => point.time.getTime() <= date.getTime());
}

export function sortedDates(points: Point[]) {
  return [...new Set(points.map((point) => point.time.toISOString().slice(0, 10)))].sort();
}

export function boundsOf(points: Point[]) {
  if (points.length === 0) return null;

  return {
    west: Math.min(...points.map((point) => point.lon)),
    south: Math.min(...points.map((point) => point.lat)),
    east: Math.max(...points.map((point) => point.lon)),
    north: Math.max(...points.map((point) => point.lat)),
  };
}

export function scenarioPoints(points: Point[], scenario = "historical") {
  return points.filter((point) => (point.scenario ?? "historical") === scenario);
}

import { pointsSchema, type PointsData } from "./schemas";

const essayFiles = import.meta.glob("../../content/essays/**/data/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

const demoFiles = import.meta.glob("../../data/demo/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

const normaliseKey = (key: string) => {
  if (key.startsWith("../../content/essays/")) {
    return key.replace("../../content/essays/", "").replace("/data/", "/");
  }

  return `demo/${key.replace("../../data/demo/", "")}`;
};

const allFiles = new Map(
  [...Object.entries(essayFiles), ...Object.entries(demoFiles)].map(([key, value]) => [
    normaliseKey(key),
    value,
  ]),
);

function issuePath(path: PropertyKey[]) {
  return path.length > 0 ? path.map(String).join(".") : "root";
}

export function loadPointsData(reference: string): PointsData {
  const raw = allFiles.get(reference);

  if (!raw) {
    throw new Error(`Module data ${reference}: file not found`);
  }

  const result = pointsSchema.safeParse(raw);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Error(`Module data ${reference}: ${issuePath(issue.path)}: ${issue.message}`);
  }

  return result.data;
}

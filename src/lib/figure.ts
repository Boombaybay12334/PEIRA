export interface FigureValidationProps {
  page: string;
  src: unknown;
  alt: unknown;
  caption: unknown;
  credit: unknown;
  license: unknown;
}

const requiredProps = ["alt", "caption", "credit", "license"] as const;

export function assertFigureProps(props: FigureValidationProps): void {
  for (const prop of requiredProps) {
    const value = props[prop];
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`Figure on ${props.page}: missing ${prop}`);
    }
  }

  if (
    (typeof props.src === "string" && props.src.trim() === "") ||
    (typeof props.src !== "string" && (typeof props.src !== "object" || props.src === null))
  ) {
    throw new Error(`Figure on ${props.page}: missing src`);
  }
}

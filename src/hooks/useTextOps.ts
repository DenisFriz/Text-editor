import { splitLines, joinLines } from "../utils/textUtils";

export function applyLinesOp(text: string, fn: (line: string) => string) {
  const start = performance.now();
  const lines = splitLines(text).map(fn);
  const result = joinLines(lines);
  const duration = performance.now() - start;

  return { result, duration };
}

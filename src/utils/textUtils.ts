// ---------- helpers ----------
export const splitLines = (text: string) =>
  text.replace(/\r\n/g, "\n").split("\n");

export const joinLines = (lines: string[]) => lines.join("\n");

export const toUpper = (line: string) => line.toUpperCase();

export const toLower = (line: string) => line.toLowerCase();

export const capitalizeEachWord = (line: string) =>
  line
    .toLowerCase()
    .replace(
      /\p{L}+/gu,
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );

export const capitalizeFirstWord = (line: string) => {
  const trimmed = line.trim();
  if (!trimmed) return line;

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

export const addPlusBeforeWords = (line: string) =>
  line.replace(/\p{L}+/gu, (word) => `+${word}`);

export const removePlusBeforeWords = (line: string) =>
  line.replace(/\+(?=\p{L})/gu, "");

export const wrapWithQuotes = (line: string) => `"${line}"`;

export const wrapWithBrackets = (line: string) => `[${line}]`;

export const addDashPrefix = (line: string) => `-${line}`;

export const addDashBracketsPrefix = (line: string) => `-[${line}]`;

export const addDashQuotesPrefix = (line: string) => `-"${line}"`;

export const trimSpaces = (line: string) => line.replace(/\s+/g, " ").trim();

export const removeTabs = (line: string) => line.replace(/\t+/g, "");

export const removeAfterDash = (line: string) => line.replace(/\s-.*$/, "");

export const replaceSpacesWithUnderscore = (line: string) =>
  line.replace(/\s+/g, "_");

export const removeSpecials = (line: string) =>
  line.replace(/[()\\~!@#$%^&*_=\+\[\]{}|;':",\/<>?`]/g, "");

export const replaceSpecialsWithSpace = (line: string) =>
  line.replace(/[()\\~!@#$%^&*_=\+\[\]{}|;':",\/<>?`]/g, " ");

export function findAndReplace(text: string, find: string, replace: string) {
  if (!find) return text;

  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "g");

  return text.replace(regex, replace);
}
export const sortAsc = (text: string) =>
  splitLines(text)
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .sort((a, b) => a.localeCompare(b, "uk"))
    .join("\n");

export const sortDesc = (text: string) =>
  splitLines(text)
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .sort((a, b) => b.localeCompare(a, "uk"))
    .join("\n");

export const removeDuplicates = (line: string) =>
  Array.from(new Set(splitLines(line))).join("\n");

export const copyToClipboard = (text: string) =>
  navigator.clipboard.writeText(text);

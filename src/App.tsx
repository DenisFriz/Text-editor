import { useRef, useState } from "react";
import { useHistory } from "./hooks/useHistory";
import { applyLinesOp } from "./hooks/useTextOps";
import {
  trimSpaces,
  removeAfterDash,
  copyToClipboard,
  addDashBracketsPrefix,
  addDashPrefix,
  addDashQuotesPrefix,
  addPlusBeforeWords,
  capitalizeEachWord,
  capitalizeFirstWord,
  removePlusBeforeWords,
  removeSpecials,
  removeTabs,
  replaceSpacesWithUnderscore,
  replaceSpecialsWithSpace,
  toLower,
  toUpper,
  wrapWithBrackets,
  wrapWithQuotes,
  findAndReplace,
  sortAsc,
  sortDesc,
  removeDuplicates,
} from "./utils/textUtils";
import { downloadTxt, importTxtFile } from "./utils/fileUtils";
import { Button } from "./components/Button";

const actions = [
  // РЕЄСТР
  { label: "UPPER", fn: toUpper },
  { label: "lower", fn: toLower },
  { label: "Capitalize Words", fn: capitalizeEachWord },
  { label: "Capitalize First", fn: capitalizeFirstWord },

  // СИМВОЛИ
  { label: "+ before words", fn: addPlusBeforeWords },
  { label: "Remove +", fn: removePlusBeforeWords },
  { label: 'Wrap " "', fn: wrapWithQuotes },
  { label: "Wrap [ ]", fn: wrapWithBrackets },
  { label: "- prefix", fn: addDashPrefix },
  { label: "-[ ] prefix", fn: addDashBracketsPrefix },
  { label: '-" " prefix', fn: addDashQuotesPrefix },

  // ОЧИЩЕННЯ
  { label: "Trim spaces", fn: trimSpaces },
  { label: "Remove tabs", fn: removeTabs },
  { label: 'Remove after " -"', fn: removeAfterDash },
  { label: "Spaces → _", fn: replaceSpacesWithUnderscore },
  { label: "Remove specials", fn: removeSpecials },
  { label: "Specials → space", fn: replaceSpecialsWithSpace },
];

function App() {
  const history = useHistory("");
  const [duration, setDuration] = useState(0);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");

  const lines = history.text.split("\n");
  const emptyLinesCount = lines.filter((line) => line.trim() === "").length;

  const run = (fn: (line: string) => string) => {
    setTimeout(() => {
      const { result, duration } = applyLinesOp(history.text, fn);
      history.set(result);
      setDuration(duration);
    }, 0);
  };

  const runText = (fn: (text: string) => string) => {
    const start = performance.now();
    const result = fn(history.text);
    history.set(result);
    setDuration(performance.now() - start);
  };

  const saveToBuffer = async () => {
    try {
      await copyToClipboard(history.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <section className="py-5">
      <div className="max-w-5xl mx-auto px-2">
        <div className="mb-3 flex flex-wrap gap-7">
          <Button
            onClick={() => history.set("")}
            disabled={!history.text.trim()}
          >
            Clear
          </Button>
          <Button onClick={saveToBuffer} disabled={!history.text.trim()}>
            {copied ? "Copied ✓" : "Copy"}
          </Button>
          <Button onClick={() => fileInputRef.current?.click()}>
            Import .txt
            <input
              type="file"
              accept=".txt"
              hidden
              ref={fileInputRef}
              onChange={(e) => importTxtFile(e, (text) => history.set(text))}
            />
          </Button>
          <Button
            onClick={() => downloadTxt(history.text)}
            disabled={!history.text.trim()}
          >
            Export .txt
          </Button>
        </div>
        <div className="mb-2">
          <textarea
            value={history.text}
            onChange={(e) => history.set(e.target.value)}
            name="text"
            id="text"
            className="resize-none rounded-lg p-3 border border-black w-full"
            rows={5}
            placeholder="Enter your text"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {actions.map(({ label, fn }) => (
            <Button
              key={label}
              onClick={() => run(fn)}
              disabled={!history.text.trim()}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="mt-6 border-t pt-4">
          <div className="flex flex-wrap gap-3 mb-3">
            <input
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder="Find"
              className="border p-2 rounded w-40"
            />
            <input
              value={replace}
              onChange={(e) => setReplace(e.target.value)}
              placeholder="Replace"
              className="border p-2 rounded w-40"
            />
            <Button
              disabled={!history.text.trim() || !find}
              onClick={() => {
                const result = findAndReplace(history.text, find, replace);
                history.set(result);
              }}
            >
              Replace all
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button
            onClick={() => runText(sortAsc)}
            disabled={!history.text.trim()}
          >
            Sort A-Я
          </Button>
          <Button
            onClick={() => runText(sortDesc)}
            disabled={!history.text.trim()}
          >
            Sort Я-А
          </Button>
          <Button
            onClick={() => runText(removeDuplicates)}
            disabled={!history.text.trim()}
          >
            Remove duplicates
          </Button>
        </div>
        <div className="mt-5 flex flex-wrap gap-7">
          <Button
            className="bg-amber-400 hover:bg-amber-200"
            onClick={history.undo}
          >
            Undo
          </Button>
          <Button
            className="bg-amber-400 hover:bg-amber-200"
            onClick={history.redo}
          >
            Redo
          </Button>
        </div>
        <div className="mt-4">
          Lines: {lines.length} | Empty lines: {emptyLinesCount} | Last op:{" "}
          {duration.toFixed(1)} ms
        </div>
      </div>
    </section>
  );
}

export default App;

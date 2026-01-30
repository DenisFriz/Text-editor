import { useState } from "react";

export function useHistory(initial: string, limit = 10) {
  const [past, setPast] = useState<string[]>([]);
  const [present, setPresent] = useState(initial);
  const [future, setFuture] = useState<string[]>([]);

  const set = (next: string) => {
    setPast((p) => [...p.slice(-limit + 1), present]);
    setPresent(next);
    setFuture([]);
  };

  const undo = () => {
    if (!past.length) return;
    const prev = past[past.length - 1];
    setPast((p) => p.slice(0, -1));
    setFuture((f) => [present, ...f]);
    setPresent(prev);
  };

  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setFuture((f) => f.slice(1));
    setPast((p) => [...p, present]);
    setPresent(next);
  };

  return { text: present, set, undo, redo };
}

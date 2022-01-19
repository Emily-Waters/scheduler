import { useState } from "react";

export default function useVisualMode(initial, replace) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(current, replace) {
    replace && back();
    const newHistory = history;
    newHistory.push(current);
    setHistory(newHistory);
    setMode(current);
  }

  function back() {
    const newHistory = history;
    newHistory.length > 1 && newHistory.pop() && setHistory(newHistory);
    setMode(() => newHistory[newHistory.length - 1]);
  }

  return { mode, transition, back };
}

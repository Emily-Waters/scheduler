import { useState } from "react";

export default function useVisualMode(initial, replace) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(current, replace) {
    replace && back();
    history.push(current);
    setHistory(history);
    setMode(current);
  }

  function back() {
    history.length > 1 && history.pop() && setHistory(history);
    setMode(() => history[history.length - 1]);
  }

  return { mode, transition, back };
}

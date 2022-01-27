import { useState } from "react";

// Handles state management for Appointment for navigation, accepts an initial value as string and a replace option as boolean. Replace is used to indicate whether the current mode is to be appended to the history state array when false or replace the current last index value on true
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(current, replace) {
    const [...newHistory] = history;
    if (replace && newHistory.length > 1) {
      newHistory.pop();
    }
    newHistory.push(current);
    setHistory(newHistory);
    setMode(current);
  }

  function back() {
    const [...newHistory] = history.slice(0, -1);
    if (newHistory.length > 1) {
      setHistory(newHistory);
    }
    newHistory[newHistory.length - 1] &&
      setMode(newHistory[newHistory.length - 1]);
  }

  return { mode, transition, back };
}

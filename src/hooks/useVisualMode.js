import { useState } from "react";

// Handles state management for Appointment for navigation, accepts an initial value as string and a replace option as boolean. Replace is used to indicate whether the current mode is to be appended to the history state array when false or replace the current last index value on true
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

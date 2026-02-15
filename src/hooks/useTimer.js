import { useState, useEffect, useRef } from "react";

export function useTimer(isRunning, isPaused) {
  const [time, setTime] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      ref.current = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(ref.current);
  }, [isRunning, isPaused]);

  const reset = () => setTime(0);

  return { time, setTime, reset };
}

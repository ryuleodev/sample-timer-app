"use client"

import { useEffect, useState } from "react"

export default function Home() {
  const [time, setTime] = useState(1500)
  const [mode, setMode] = useState("Focus")
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const timer = setTimeout(() => {
      if (time === 0) {
        if (mode === "Focus") {
          setMode("Rest")
          setTime(600)
        } else {
          setMode("Focus")
          setTime(1500)
        }
        return
      } else if (time > 0) {
        setTime((prev) => prev - 1)
      }
    }, 1000);

    return () => clearTimeout(timer)
  }, [time, mode, isRunning])

  function formatTime(second: number) {
    const minute = Math.floor(second / 60);
    const convertedSecond = second % 60;

    return `${String(minute).padStart(2, "0")}:${String(convertedSecond).padStart(2, "0")}`;
  }

  function startTimer() {
    setIsRunning(true)
  }

  function stopTimer() {
    setIsRunning(false)
  }

  function resetTimer() {
    setTime(1500)
    setMode("Focus")
    setIsRunning(false)
  }

  return (
    <main style={{ padding: 24, textAlign: "center" }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>{formatTime(time)}</h1>
      <h2 style={{ fontSize: 48, marginBottom: 16 }}>{mode}</h2>
      <button
        onClick={startTimer}
        disabled={isRunning}
        style={{ margin: 4, padding: "8px 16px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
      >
        Start
      </button>
      <button
        onClick={stopTimer}
        disabled={!isRunning}
        style={{ margin: 4, padding: "8px 16px", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
      >
        Stop
      </button>
      <button
        onClick={resetTimer}
        style={{ margin: 4, padding: "8px 16px", backgroundColor: "#6b7280", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
      >
        Reset
      </button>
    </main>
  )
}

import React, { useState, useEffect } from "react";
import { MdTimer } from "react-icons/md";

function PomodoroWidget() {

  const [seconds, setSeconds] = useState(1500); // 25 min
  const [running, setRunning] = useState(false);

  useEffect(() => {

    let timer;

    if (running && seconds > 0) {

      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);

    }

    return () => clearInterval(timer);

  }, [running, seconds]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (

    <div className="widget-card">

      <div className="widget-header">

        <MdTimer className="widget-icon" />

        <h3>Pomodoro Timer</h3>

      </div>

      <h1>{minutes}:{secs}</h1>

      <div className="timer-buttons">

        <button onClick={() => setRunning(true)}>
          Start
        </button>

        <button onClick={() => setRunning(false)}>
          Pause
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(1500);
          }}
        >
          Reset
        </button>

      </div>

    </div>

  );
}

export default PomodoroWidget;
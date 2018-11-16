import React from "react";
import "./Pomodoro.scss";

import { secondsToTime } from "../../utilities";

const pomodoro = ({
  timer,
  startPomodoro,
  stopPomodoro,
  intervalId,
  pomodoroCompleted,
  isPomodoro
}) => {
  console.log(isPomodoro);
  if (timer === 0 && intervalId) {
    pomodoroCompleted(isPomodoro);
  }
  const running = intervalId !== null;
  const fullTime = isPomodoro ? 1500 : 300;
  const percentageDone = ((fullTime - timer) / fullTime) * 100;
  const innerColor = isPomodoro ? "#2ecc71" : "#3498db";
  const style = {
    background: `linear-gradient(0deg, 
      ${innerColor} ${percentageDone}%, 
      transparent ${percentageDone}%)`,
    border: `5px solid ${isPomodoro ? "#f39c12" : "#bdc3c7"}`
  };
  return (
    <div className="Pomodoro">
      {/* clock */}
      <div style={style} className="Pomodoro-Clock">
        {/* controls */}
        <div className="Pomodoro-Controls">
          <h2 className="Pomodoro-Time">{secondsToTime(timer)}</h2>
          <i
            onClick={!running ? startPomodoro : stopPomodoro}
            className={`Pomodoro-Icon fas fa-${running ? "stop" : "play"}`}
          />
        </div>
      </div>
    </div>
  );
};

export default pomodoro;

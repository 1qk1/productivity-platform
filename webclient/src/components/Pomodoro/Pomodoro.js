import React from "react";
import "./Pomodoro.scss";

import { secondsToTime } from "../../utilities";

const pomodoro = ({ timer, startPomodoro, stopPomodoro, intervalId }) => {
  const running = intervalId !== null;
  const percentageDone = ((1500 - timer) / 1500) * 100;
  const style = {
    background: `linear-gradient(0deg, 
      #2ecc71 ${percentageDone}%, 
      transparent ${percentageDone}%)`
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

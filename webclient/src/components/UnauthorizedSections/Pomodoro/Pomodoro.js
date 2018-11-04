import React from "react";
import clockIcon from "../../../assets/clock.png";

import "./Pomodoro.scss";

const pomodoro = () => {
  return (
    <section className="Section Section-Pomodoro">
      <div className="Subsection">
        <h3 className="Subsection-Header">
          Focus on your work. <br />
          Get rid of distractions.
        </h3>
        <p className="Subsection-Paragraph">
          With 25 minute sessions dedicated to work and 5 minute breaks, your
          work becomes your main focus again.
        </p>
      </div>
      <div className="Subsection">
        <img className="Subsection-Image" src={clockIcon} alt="Clock Icon" />
      </div>
    </section>
  );
};

export default pomodoro;

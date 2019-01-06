import React from "react";
import clockIcon from "../../../assets/clock.svg";

const pomodoro = () => {
  return (
    <section className="Section Section-Pomodoro">
      <div className="Section-Wrapper Container">
        <div className="Subsection">
          <h2 className="Subsection-Header">
            Focus on your work. <br />
            Get rid of distractions.
          </h2>
          <p className="Subsection-Paragraph">
            With 25 minute sessions dedicated to work and 5 minute breaks, your
            work becomes your main focus again.
          </p>
        </div>
        <div className="Subsection">
          <img className="Subsection-Image" src={clockIcon} alt="Clock Icon" />
        </div>
      </div>
    </section>
  );
};

export default pomodoro;

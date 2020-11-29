import React from "react";
import activityImage from "../../../assets/landing-activity.svg";

const pomodoro = () => {
  return (
    <section className="Section Section-Pomodoro">
      <div className="Container row">
        <div className="Subsection col-12 col-md-8 d-flex flex-column justify-content-center">
          <h2 className="Subsection-Header">
            Focus on your work. <br />
            Get rid of distractions.
          </h2>
          <p className="Subsection-Paragraph">
            Stay on top of your time with 25 minute sessions dedicated to work
            and 5 minute breaks in between.
          </p>
        </div>
        <div className="Subsection col-12 col-md-4">
          <img
            className="Subsection-Image"
            src={activityImage}
            alt="Clock Icon"
          />
        </div>
      </div>
    </section>
  );
};

export default pomodoro;

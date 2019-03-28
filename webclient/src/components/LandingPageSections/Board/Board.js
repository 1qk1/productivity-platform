import React from "react";
import landingBoardImage from "../../../assets/landing-board.svg";

const board = () => {
  return (
    <section className="Section Section-Board Section-Reversed">
      <div className="Container row">
        <div className="Subsection col l8 m12">
          <h2 className="Subsection-Header">Your time, organized.</h2>
          <p className="Subsection-Paragraph">
            Organize your tasks in seperate categories and focus on the things
            that matter.
          </p>
        </div>
        <div className="Subsection col l4 m12">
          <img
            className="Subsection-Image"
            src={landingBoardImage}
            alt="Board"
          />
        </div>
      </div>
    </section>
  );
};

export default board;

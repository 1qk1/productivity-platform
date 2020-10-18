import React from "react";
import landingBoardImage from "../../../assets/landing-board.svg";

const board = () => {
  return (
    <section className="Section Section-Board">
      <div className="Container row">
        <div className="Subsection col-12 col-lg-4">
          <img
            className="Subsection-Image"
            src={landingBoardImage}
            alt="Board"
          />
        </div>
        <div className="Subsection col-12 col-lg-8 d-flex flex-column justify-content-center">
          <h2 className="Subsection-Header">Your time, organized.</h2>
          <p className="Subsection-Paragraph">
            Organize your tasks in seperate categories and focus on the things
            that matter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default board;

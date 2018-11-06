import React from "react";

const board = () => {
  return (
    <section className="Section Section-Board Section-Reversed">
      <div className="Subsection">
        <h3 className="Subsection-Header">
          Your time, <br />
          Organized.
        </h3>
        <p className="Subsection-Paragraph">
          Organize your tasks in seperate categories and focus on the things
          that matter.
        </p>
      </div>
      <div className="Subsection">
        <img className="Subsection-Image" alt="Board" />
      </div>
    </section>
  );
};

export default board;

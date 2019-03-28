import React from "react";
import statsImage from "../../../assets/landing-stats.svg";

const stats = () => {
  return (
    <section className="Section Section-Stats">
      <div className="Container row">
        <div className="Subsection col l8 m12">
          <h2 className="Subsection-Header">
            See your most productive hours and more stats.
          </h2>
          <p className="Subsection-Paragraph">
            Track your productivity and see when you are most productive, review
            how you manage your time and manage your time better.{" "}
            <small style={{ color: "gray" }}>(coming soon)</small>
          </p>
        </div>
        <div className="Subsection col l4 m12">
          <img className="Subsection-Image" src={statsImage} alt="Clock Icon" />
        </div>
      </div>
    </section>
  );
};

export default stats;

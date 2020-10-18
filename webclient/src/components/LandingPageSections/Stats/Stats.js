import React from "react";
import statsImage from "../../../assets/landing-stats.svg";

const stats = () => {
  return (
    <section className="Section Section-Stats">
      <div className="Container row">
        <div className="Subsection col-12 col-md-8 d-flex flex-column justify-content-center">
          <h2 className="Subsection-Header">
            See your most productive hours and more stats.
          </h2>
          <p className="Subsection-Paragraph">
            Track your productivity and see when you are most productive, review
            how you manage your time and manage your time better.{" "}
          </p>
        </div>
        <div className="Subsection col-12 col-md-4">
          <img className="Subsection-Image" src={statsImage} alt="Clock Icon" />
        </div>
      </div>
    </section>
  );
};

export default stats;

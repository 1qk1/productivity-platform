import React from "react";
import heroImg from "../../../assets/landing-hero.svg";

import "./Hero.scss";

const hero = () => (
  <div className="Hero">
    <div className="Container row">
      <div className="Subsection col l6 m12">
        <h1 className="Subsection-Header">
          Beat procrastination and track your time.
        </h1>
        <p className="Subsection-Paragraph">
          Stay on top of things. Ineffective time management can take many
          forms. Whether it’s procrastination, personal distractions, or
          projects that take more time than they should, there are tons of
          different things that waste our time every day.
        </p>
        <a href="/" className="Hero--CTA btn-large btn-long">
          Sign up. For Free.
        </a>
      </div>
      <div className="col l6 m12">
        <img className="bg-image" src={heroImg} alt="Hero" />
      </div>
    </div>
  </div>
);

export default hero;

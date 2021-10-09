import React from "react";
import heroImg from "../../../assets/landing-hero.svg";
import PropTypes from "prop-types";

import "./Hero.scss";

const hero = ({ toggleForms }) => (
  <div className="Hero">
    <div className="Container row">
      <div className="Subsection col-12 col-md-6">
        <h1 className="Subsection-Header">
          Beat procrastination and track your time.
        </h1>
        <p className="Subsection-Paragraph">
          Stay on top of things. Ineffective time management can take many
          forms. Whether it’s procrastination, personal distractions, or
          projects that take more time than they should, there are tons of
          different things that waste our time every day.
        </p>
        <button className="Hero--CTA btn btn-green btn-large btn-long" onClick={toggleForms}>
          Sign up. For Free.
        </button>
      </div>
      <div className="col-12 col-md-6">
        <img className="bg-image" src={heroImg} alt="Hero" />
      </div>
    </div>
  </div>
);

hero.propTypes = {
  toggleForms: PropTypes.func.isRequired,
};

export default hero;

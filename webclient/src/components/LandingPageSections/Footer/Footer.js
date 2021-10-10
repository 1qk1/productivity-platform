import React from "react";
import "./Footer.scss";

const footer = () => {
  return (
    <section className="Landing-Footer">
      <div className="Container">
        <ul className="Footer-Links list-unstyled">
          <li>
            <a
              href="https://twitter.com/qktweets"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://github.com/1qk1/productivity-platform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default footer;

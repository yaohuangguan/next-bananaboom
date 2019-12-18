/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.scss";
const SocialFooter = () => {
  return (
    <div>
      <ul className="list-unstyled list-inline text-center text-white">
        <li className="list-inline-item">
          <a
            className="btn-floating btn-fb mx-1 text-white"
            href="https://www.facebook.com/sam.yao.10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"> </i>
          </a>
        </li>

        <li className="list-inline-item">
          <a
            className="btn-floating btn-gplus mx-1 text-white"
            href="https://www.instagram.com/moviegoer24/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            className="btn-floating btn-li mx-1 text-white"
            href="https://www.linkedin.com/in/baiyang-sam-y-54828a140/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in"> </i>
          </a>
        </li>
        <li className="list-inline-item">
          <a className="btn-floating btn-dribbble mx-1 text-white">
            <i className="fab fa-dribbble"> </i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialFooter;

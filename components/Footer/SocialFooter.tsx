/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.scss";
const SocialFooter = () => {
  return (
    <div>
      <ul className="list-unstyled list-inline text-center text-white">
        <li className="list-inline-item">
          <a
            className="btn-floating"
            href="https://www.weibo.com/u/5350193792"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/color/32/000000/weibo.png"  alt='weibo' />
          </a>
        </li>
        <li className="list-inline-item">
          <a
            className="btn-floating btn-fb mx-1"
            href="https://www.facebook.com/sam.yao.10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/office/32/000000/facebook-new.png" alt='facebook' />
          </a>
        </li>

        <li className="list-inline-item">
          <a
            className="btn-floating btn-gplus mx-1"
            href="https://www.instagram.com/moviegoer24/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/nolan/32/000000/instagram-new.png" alt='ins' />
          </a>
        </li>
        <li className="list-inline-item">
          <a
            className="btn-floating btn-li mx-1"
            href="https://www.linkedin.com/in/baiyang-sam-y-54828a140/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="https://img.icons8.com/cute-clipart/32/000000/linkedin.png" alt='linkedin'/>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialFooter;

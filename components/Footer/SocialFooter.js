/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useRouter } from "next/router";
import Likes from "../Likes/Likes";
import "../Blog/BlogListItem.scss";
import "./Footer.scss";
const SocialFooter = ({ likes, _id }) => {
  const router = useRouter();
  const handleShareText = () => {
    return router.pathname === "/" ? "Share with friends" : "分享本站";
  };
  const handleCopyText = () => {
    let dummy = document.createElement("input");
    let url = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    dummy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(dummy);

    let tooltip = document.getElementById(`share-button-tip`);
    tooltip.innerHTML =
      router.pathname === "/"
        ? "Thank you! Url copied!"
        : "谢谢分享!网址已复制!";
  };
  const cleanCopyText = () => {
    let tooltip = document.getElementById(`share-button-tip`);
    tooltip.innerHTML = handleShareText();
  };
  return (
    <div className="mb-5">
      <Likes likes={likes} _id={_id}></Likes>
      <div
        className="share-button font-weight-bold"
        onClick={handleCopyText}
        onMouseOut={cleanCopyText}
      >
        <span className="share-button-text" id={`share-button-tip`}>
          {handleShareText()}
        </span>
        {handleShareText()}
        <i className="fas fa-external-link-alt"></i>
      </div>
      <ul className="list-unstyled list-inline text-center">
        <li className="list-inline-item">
          <a
            className="btn-floating"
            href="https://www.weibo.com/u/5350193792"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-weibo"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            className="btn-floating btn-fb mx-1"
            href="https://www.facebook.com/sam.yao.10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </li>

        <li className="list-inline-item">
          <a
            className="btn-floating btn-gplus mx-1"
            href="https://www.instagram.com/moviegoer24/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
           <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            className="btn-floating btn-li mx-1"
            href="https://www.linkedin.com/in/baiyang-sam-y-54828a140/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
      <style jsx>{
        `
        ul li a i{
          color:#333333;
          font-size:20px;
        }
        ul li a i:hover{
          color:#007bff;
        }
        `
      }</style>
    </div>
  );
};

export default SocialFooter;

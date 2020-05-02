/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useRouter } from "next/router";
import Likes from "../Likes/Likes";
import "../Blog/BlogListItem.scss";
import "./Footer.scss";
const SocialFooter = ({ likes, _id }: { likes: number; _id: string }) => {
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
    <div className="white-text text-center">
      <div
        className="share-button p-2 ml-3"
        onClick={handleCopyText}
        onMouseOut={cleanCopyText}
      >
        <span className="share-button-text" id={`share-button-tip`}>
          {handleShareText()}
        </span>

        <span className="share-text">
          {handleShareText()}
          <i className="fas fa-share"></i>
        </span>
      </div>
      <ul className="list-unstyled list-inline text-center">
        <li className="list-inline-item">
          <a
            className="m-2"
            href="https://www.weibo.com/u/5350193792"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-weibo"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            className="m-2"
            href="https://www.facebook.com/sam.yao.10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </li>

        <li className="list-inline-item">
          <a
            className="m-2"
            href="https://www.instagram.com/moviegoer24/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            className="m-2"
            href="https://www.linkedin.com/in/baiyang-sam-y-54828a140/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
      </ul>
      <Likes likes={likes} _id={_id}></Likes>

      <style jsx>{`
        ul li a i {
          color: #fff;
          font-size: 25px;
        }
        ul li a i:hover {
          color: #007bff;
        }
        .share-text {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default SocialFooter;

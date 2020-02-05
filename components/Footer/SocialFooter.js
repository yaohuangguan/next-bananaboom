/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {useRouter} from 'next/router'
import Likes from '../Likes/Likes'
import '../Blog/BlogListItem.scss'
import "./Footer.scss";
const SocialFooter = ({likes,_id}) => {
  const router = useRouter()
  const handleShareText = () =>{
    return router.pathname==='/'?'Share with friends':'分享本站'
  }
  const handleCopyText = () => {
    let dummy = document.createElement("input");
    let url = window.location.href
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    dummy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(dummy);

    let tooltip = document.getElementById(`share-button-tip`);
    tooltip.innerHTML = router.pathname==='/'?'Thank you! Url copied!':'谢谢分享!网址已复制!'
  };
  const cleanCopyText = () =>{
    var tooltip = document.getElementById(`share-button-tip`);
    tooltip.innerHTML = handleShareText()
  }
  return (
    <div className="mb-5">
      <Likes likes={likes} _id={_id}></Likes>
      <div className="share-button  font-weight-bold" onClick={handleCopyText} onMouseOut={cleanCopyText}>
      <span className="share-button-text" id={`share-button-tip`}>
      {handleShareText()}
              </span>
        {handleShareText()}<img src="data:image/png;base64,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"></img>
      </div>
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

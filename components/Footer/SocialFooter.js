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
    let tooltip = document.getElementById(`share-button-tip`);
    tooltip.innerHTML = handleShareText()
  }
  return (
    <div className="mb-5">
      <Likes likes={likes} _id={_id}></Likes>
      <div className="share-button font-weight-bold" onClick={handleCopyText} onMouseOut={cleanCopyText}>
      <span className="share-button-text" id={`share-button-tip`}>
      {handleShareText()}
              </span>
        {handleShareText()}<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAADrElEQVRIie3Vf2hWVRzH8ff3bnvuudsedU0N6g8zt6LMDIJsDsN6zDmjJcFD2NqiETFDMlEb9ANGBEa5PxrVsBBDDckFtYqkLdim0NJUMMpJmIjOwBKnsJzPvfecb384h87i2RPuv33g/vU957zOj8s5MJnJTFDkRg9422pd7DmeVbgHwaEcVmHLiQ9k34TAi5s1/8wfbEaYr9CSl8dPNsJDqBBhA0pn/y2sp1kcgHej4AsnaQkcvomoCWKqEhn6AseewFIxxZIylrL7TvLGlfbXwRVpDRbU6pRc0Afr9C7jqC6yrDWOHt9xeKqlvCBibuAY8GK6gpDnA0dDRb3eCldt9aLndEZBRKvCciADnEZo7N5+7dn8Wx6p09dVcSokRXHdO+S1q+uLa7VNhOMi3KyO492fyoceQDqtieJLfOdbDugApd07ZKaxvGxiPqtaqXOzwSZijrEcCWIqfMs3Y+tBzFfGsjBh+cU4ymFkq61S78f0794pLT09EgPs3im9QUxTUczGrLBl2EQUmZjzhTEzrqsrM41lsDAkGViGRmGjzCt09I7tUBTT7VvmZYMTlj7jWGocW3zLq+m0BldqDTWaNDEbfMfWhLLUWPoA8gESMWeA2WMHLIA5+ZZT2WCbx+fFIW86odWDLiwHG1boLlXyFZ4yls1EFOBx+6wLdI6uuFj5JIh5evVyHV1dQ40m/ZB3TMxH2eD2dhn2Y74ojPnWRPQWOp7xI0I/YigR8oRxHDOOrUFEbfPIUY7+1WurdAnCx8ABlEGER4FBhP6BYurb28X+F7x2mb4owioHr4jyloBVYR+KB1QCQ57wQstuOXKlzzU3V9MSnepBSpSEKH2/lTJQNsg2QI6VUFd2jgcQUkCRCvtNJR2X9tIowqrII7WpU/4EaKrS+Z7jXlGsehza2ClHx04265W5K615/WfZDtwPDKPsBIYQqoFyINQCUs0j6Hgzrrv67Yd0vSiVyUbW2SLWCUxVoe3vTVQKLGraK4/ngo4bfm+hnqKUytI6vufyKlHIkGH+uTY6BB576Qf5PRc4P1uD1gU6xY+RWStJ2vAyOhJfhdTFmIOq3A3kBGd9neYFXDSWpBzir2khF6aFMPpl+Nk4ZgcxZ3NBxwU/3COxsXx5vovVJSHpkpBfSzKcvClk3en3MX7M9KCM/bnC4zrjr+/Q6S5BL7DHE7ZZGBJHNR5r1PLkiiPZX7D/BQN03KlJ47EGYRlKAPzolHerj8qJXNHJTGZC8w8W63CFBj6VLAAAAABJRU5ErkJggg==" />
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

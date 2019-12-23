import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Switch from "./Switch";
const HamburgerMenu = dynamic(() => import("./Hamburger/Hamburger"), {
  ssr: false
});
require('./Header.scss')
const Header = ({
  login,
  clothing,
  blogName,
  resumeName,
  flag,
  resumeRoute,
  homeRoute,
  changeLanguageRoute
}) => {
  const changeHeader = () => {
    let header = document.querySelector(".header");
    if (window.scrollY > 100 && !header.className.includes("solid")) {
      header.classList.add("solid");
      header.classList.add("purple-gradient");
    } else if (window.scrollY < 100) {
      header.classList.remove("solid");
      header.classList.remove("purple-gradient");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeHeader, true);
    return () => {
      window.removeEventListener("scroll", changeHeader, true);
    };
  }, [changeHeader]);

  const flipFlag = () => {
    const flag = document.querySelector(".flag");
    flag.classList.add("animated", "rotateIn");
    flag.addEventListener("animationend", () =>
      flag.classList.remove("animated", "rotateIn")
    );
  };

  return (
    <div className="nav">
      <div className="header">
        <Link href={homeRoute}>
          <a id="logo" className="px-3">
            <h5 className="white-lighter">
              <i className="far fa-lemon fa-lg"></i>
            </h5>
          </a>
        </Link>
        <div className="options">
          <a
            href="http://clothes.yaobaiyang.com/"
            className="option"
            target="_blank"
            rel="noopener noreferrer"
          >
            {clothing}
          </a>

          <Link href="/blogs/blog">
            <a className="option">{blogName}</a>
          </Link>
          <Link href={resumeRoute}>
            <a className="option">{resumeName}</a>
          </Link>
          <Link href="/auth/login">
            <a className="option">{login}</a>
          </Link>
          <Link href={changeLanguageRoute}>
            <a className="option">
              <img src={flag} onMouseOver={flipFlag} className="flag" alt="" />
              <span className='btn-hover color-5'>{changeLanguageRoute == '/' ? 'English' : '中文'}</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="hamburger px-4 py-3">
        <HamburgerMenu
          login={login}
          clothing={clothing}
          blogName={blogName}
          resumeName={resumeName}
          changeLanguageRoute={changeLanguageRoute}
          resumeRoute={resumeRoute}
          flag={flag}
          flipFlag={flipFlag}
        />
      </div>
    </div>
  );
};

export default Header;

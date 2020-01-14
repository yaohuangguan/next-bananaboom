import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {withRouter} from 'next/router'
import firebase from "../../firebase/firebase";
import '../Header/Hamburger/Hamburger.scss'
const Signup = dynamic(() => import("../Auth/Signup"), {
  ssr: false
});
const Dropdown = dynamic(()=>import('./DropDown/DropDown'),{
  ssr:false
})
const HamburgerMenu = dynamic(() => import("./Hamburger/Hamburger"), {
  ssr: false
});
const Header = ({
  login,
  blogName,
  resumeName,
  resumeRoute,
  homeRoute,
  changeLanguageRoute,
  currentUser,
  router
}) => {
  useEffect(() => {
    const headerChange = () => {
      let c = 0;
      let currentScrollTop = 0;
      let navbar = document.querySelector(".header");
      window.addEventListener("scroll", () => {
        let a = scrollY;
        let b = navbar.clientHeight;
        currentScrollTop = a;
        if (a == 0) {
          navbar.classList.remove("purple-gradient");
          navbar.classList.remove("solid");
        }
        if (c < currentScrollTop && a > b + b) {
          navbar.classList.add("scrollUp");
        } else if (c > currentScrollTop && !(a <= b)) {
          navbar.classList.remove("scrollUp");
          navbar.classList.add("solid");
          navbar.classList.add("purple-gradient");
        }
        c = currentScrollTop;
      });
    };
    headerChange();
  });

  return (
    <div className="nav">
      <div className="header">
        <Link  href={homeRoute}>
          <a id="logo" className="px-3">
            <img src="https://img.icons8.com/ultraviolet/32/000000/ninja-turtle.png" alt='sitelogo' />
          </a>
        </Link>
        <div className="options">
          <Link  href="/blogs">
            <div className="option">
              <a>{blogName}</a>
            </div>
          </Link>
          <Link  href={resumeRoute} as={`/resume/${router.pathname=='/' ? 'en-us' : 'ch-cn' }`}>
            <div className="option">
              <a>{resumeName}</a>
            </div>
          </Link>
          {currentUser ? (
            <div className="option">
             <Dropdown currentUser={currentUser}></Dropdown>
            </div>
          ) : (
            <div className="option">
              <a className="text-success">
                <Signup login={login}></Signup>
              </a>
            </div>
          )}

          <Link  href={changeLanguageRoute}>
            <div className="option">
              <a>
                <span className="btn-hover color-5">
                  {changeLanguageRoute == "/" ? "🇬🇧English" : "🇨🇳中文"}
                </span>
              </a>
            </div>
          </Link>
        </div>
      </div>
      <div className="hamburger dropdown-mobile px-3 py-3">
        <HamburgerMenu
          login={login}
          currentUser={currentUser}
          blogName={blogName}
          resumeName={resumeName}
          changeLanguageRoute={changeLanguageRoute}
          resumeRoute={resumeRoute}
        />
      </div>
    </div>
  );
};

export default withRouter(Header);

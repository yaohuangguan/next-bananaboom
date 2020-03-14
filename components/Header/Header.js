import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { withRouter } from "next/router";
import "../Header/Hamburger/Hamburger.scss";
import "./Header.scss";
const Signup = dynamic(() => import("../Auth/Signup"), {
  ssr: false
});
const Dropdown = dynamic(() => import("./DropDown/DropDown"), {
  ssr: false
});
const HamburgerMenu = dynamic(() => import("./Hamburger/Hamburger"), {
  ssr: false
});
const Header = ({
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
        if (a === 0 || b === 0) {
          navbar.classList.remove("purple-gradient");
          navbar.classList.remove("solid");
        }
        if (c < currentScrollTop && a > 5*b) {
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

  const turnOnDropDown = () => {
    let dropdown = document.querySelector(".dropdown-mobile-submenu");
    if (dropdown.style.display !== "block") {
      dropdown.classList.toggle("dropdown-hide");
    }
  };
  const getYouAndMe = () => {
    if (currentUser) {
      if (currentUser.private_token === "ilovechenfangting") {
        return (
          <Link href="/youandme">
            <span>Only We Know</span>
          </Link>
        );
      }
    }
    return null;
  };
  const getResumeRoute = () => {
    return router.pathname == "/" ? "en-us" : "ch-cn";
  };
  const getMenuRoute = () => {
    return router.pathname == "/" ? "menu" : "导航";
  };
  return (
    <div className="nav">
      <div className="header">
        <Link href={homeRoute}>
          <a id="logo" className="p-1">
            <img src="/favicon.png" width="50px" height="50px" alt="s" />
          </a>
        </Link>
        <div className="options">
          <Link href="/blogs">
            <a className="option">{blogName}</a>
          </Link>
          <Link href={resumeRoute} as={`/resume/${getResumeRoute()}`}>
            <a className="option">{resumeName}</a>
          </Link>

          <Link href={changeLanguageRoute}>
            <a className="option">
              {changeLanguageRoute == "/" ? "English" : "中文"}
            </a>
          </Link>
        </div>
        <div className="loginOption">
          {currentUser ? (
            <a className="option">
              <Dropdown currentUser={currentUser}></Dropdown>
              {getYouAndMe()}
            </a>
          ) : (
            <div className="option">
              <Signup></Signup>
            </div>
          )}

          <div className="option hamburger" onClick={turnOnDropDown}>
            <span>{getMenuRoute()}</span>
            <HamburgerMenu
              currentUser={currentUser}
              blogName={blogName}
              resumeName={resumeName}
              changeLanguageRoute={changeLanguageRoute}
              resumeRoute={resumeRoute}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);

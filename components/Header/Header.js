import { useEffect } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import "../Header/Hamburger/Hamburger.scss";
import "./Header.scss";
import Signup from "../Auth/Signup";
import Dropdown from "./DropDown/DropDown";
import HamburgerMenu from "./Hamburger/Hamburger";
import Darkmode from "../Darkmode/Darkmode";
const Header = ({
  blogName,
  resumeName,
  resumeRoute,
  changeLanguageRoute,
  currentUser,
  router,
  handleTheme,
  light,
  dark
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
        if (c < currentScrollTop && a > 2 * b) {
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
          <div className="option">
            <Darkmode
              light={light}
              dark={dark}
              handleTheme={handleTheme}
            ></Darkmode>
          </div>

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

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { withRouter } from "next/router";
import "../Header/Hamburger/Hamburger.scss";
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

  const turnOnDropDown = ()=>{
    let dropdown = document.querySelector('.dropdown-mobile-submenu')
    if(dropdown.style.display !=='block'){
      dropdown.classList.toggle('dropdown-hide')
    }
    }
  return (
    <div className="nav">
      <div className="header">
        <Link href={homeRoute}>
          <a id="logo" className="px-3 p-2">
            <img src="/static/favicon.png" width="50px" height="50px" alt="s" />
          </a>
        </Link>
        <div className="options">
          <Link href="/blogs">
            <div className="option">
              <a>{blogName}</a>
            </div>
          </Link>
          <Link
            href={resumeRoute}
            as={`/resume/${router.pathname == "/" ? "en-us" : "ch-cn"}`}
          >
            <div className="option">
              <a>{resumeName}</a>
            </div>
          </Link>
          

          <Link href={changeLanguageRoute}>
            <div className="option">
              <a>
                <span className="draw-border-white p-1">
                  {changeLanguageRoute == "/" ? "English" : "中文"}
                </span>
              </a>
            </div>
          </Link>
        </div>
        <div className="loginOption">
          {currentUser ? (
              <div className="option">
                <Dropdown currentUser={currentUser}></Dropdown>
              </div>
            ) : (
              <div className="option">
                  <Signup login={login}></Signup>
              </div>
            )}
            <div className="option hamburger px-3 py-3"  onClick={turnOnDropDown}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAABRklEQVRYhe2XvU7DMBCAv0PMTC1j904VDYiJvR3DxBPw80RV34CNbnkARoQQU+d2LMxMiGOIEG4VX9riWAX8TUnOlj9H9vkMiUQi8b8RX0BVc2AQyaMQkUlVYN/oNADugWkjSt90gSGwsSDAVEQegys5qCrAmS9eJ5irahbUqOTZeX63GlqCH5S/vx3CaAV30i1g4WtobZI20AkoZTETkddIYyV2C2sN9oHjSB4PIvJUFdgzOl0RZ5N0gGtfsC4P3kVI1Blw6YvXCaKqB8BFIJ9b4Jzl43PrRA2QA/MfSrl8TbTnfDOXkbVJjoCTAFLr4N0kiT/PrhQLcxF5qQpYgiPgEGi6ymgBCxG52aiXqo4bKlZXx8lUdeyLr5OoT53Xnrfh9pjLqE6wy3LWb+LYe8Oo2i3BgvK25b3QBKSIMEYikUj8Sj4Bb8FS0lQGs+AAAAAASUVORK5CYII=" />
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
      </div>
      
    </div>
  );
};

export default withRouter(Header);

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
                <span className="btn-hover color-5">
                  {changeLanguageRoute == "/" ? "🇬🇧English" : "🇨🇳中文"}
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
                <a className="text-success">
                  <Signup login={login}></Signup>
                </a>
              </div>
            )}
            <div className="option hamburger px-3 py-3"  onClick={turnOnDropDown}>
            <img src="https://img.icons8.com/clouds/40/000000/menu.png"/>
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

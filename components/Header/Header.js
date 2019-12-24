import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Switch from "./Switch";
const Signup = dynamic(()=>import('../Auth/Signup'),{
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
  changeLanguageRoute
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
        if(a == 0){
          navbar.classList.remove('purple-gradient')
          navbar.classList.remove('solid')
        }
        if (c < currentScrollTop && a > b + b) {
          navbar.classList.add("scrollUp");
        } else if (c > currentScrollTop && !(a <= b)) {
          navbar.classList.remove("scrollUp");
          navbar.classList.add('solid')
          navbar.classList.add('purple-gradient')
        }
        c = currentScrollTop;
      });
    };
    headerChange();
  });

  return (
    <div className="nav">
      <div className="header">
        <Link href={homeRoute}>
          <a id="logo" className="px-3">
            <img src="https://img.icons8.com/ultraviolet/32/000000/ninja-turtle.png" />
          </a>
        </Link>
        <div className="options">
          <Link href="/blogs/blog">
            <a className="option">{blogName}</a>
          </Link>
          <Link href={resumeRoute}>
            <a className="option">{resumeName}</a>
          </Link>

          <a className="option text-success">
            <Signup login={login}></Signup>
          </a>

          <Link href={changeLanguageRoute}>
            <a className="option">
              <span className="btn-hover color-5">
                {changeLanguageRoute == "/" ? "🇬🇧English" : "🇨🇳中文"}
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div className="hamburger px-4 py-3">
        <HamburgerMenu
          login={login}
          blogName={blogName}
          resumeName={resumeName}
          changeLanguageRoute={changeLanguageRoute}
          resumeRoute={resumeRoute}
        />
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import Link from "next/link";
import HamburgerMenu from "./Hamburger/Hamburger";
import "./Header.scss";
class Header extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", this.changeHeader, true);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeHeader, true);
  }
  flipFlag = () => {
    console.log("flaped");
    const flag = document.querySelector(".flag");
    flag.classList.add("animated", "rotateIn");
    flag.addEventListener("animationend", () =>
      flag.classList.remove("animated", "rotateIn")
    );
  };
  toggle = () => {
    const navToggle = document.querySelector(".toggle");
    navToggle.classList.toggle("nav-open");
  };
  changeHeader = () => {
    let header = document.querySelector(".header");
    if (window.scrollY > 100 && !header.className.includes("solid")) {
      header.classList.add("solid");
      header.classList.add("purple-gradient");
    } else if (window.scrollY < 100) {
      header.classList.remove("solid");
      header.classList.remove("purple-gradient");
    }
  };
  render() {
    const {
      vueTube,
      clothing,
      blogName,
      resumeName,
      flag,
      resumeRoute,
      homeRoute,
      changeLanguageRoute
    } = this.props;
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
            <a
              href="http://vuetube.yaobaiyang.com/"
              className="option"
              target="_blank"
              rel="noopener noreferrer"
            >
              {vueTube}
            </a>
            <Link href="/blogs/blog">
              <a className="option">{blogName}</a>
            </Link>
            <Link href={resumeRoute}>
              <a className="option">{resumeName}</a>
            </Link>
            <Link href={changeLanguageRoute}>
              <a className="option">
                <img
                  src={flag}
                  alt="china-flag"
                  className="flag"
                  onMouseOver={this.flipFlag}
                  title={"This is to credit the author by Flaticon, thank you"}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="hamburger px-4 py-3" onClick={this.toggle}>
          <HamburgerMenu
            vueTube={vueTube}
            clothing={clothing}
            blogName={blogName}
            resumeName={resumeName}
            changeLanguageRoute={changeLanguageRoute}
            resumeRoute={resumeRoute}
            flag={flag}
            flipFlag={this.flipFlag}
          />
        </div>
      </div>
    );
  }
}

export default Header;

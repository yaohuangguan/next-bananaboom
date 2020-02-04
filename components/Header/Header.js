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
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAD30lEQVRYhe2Yy2tdVRTGv520iQm3ah6DpMl1UNOEakkKoTiwrS31gaUgIk1FWwdFR6KpTqT4NzQpFcSZgkUhDZkUcWB6b7VVaIuv2kgKdeJjIrXgY6byc3C+S7an55zc3GRg8S643LX3+s46X3b2+tbeV2pa05r2PzCgDbgfKBdgWoBhYDMQCnBl52pbK3LPA1eBGeAs8CkwmsLsBb4AzvjzFbA/hRkBqs4xAywAk2tB7l2gI5obNZlej7cD54G+CNMHXADGPe71M6MRpgM4BRxplFybV64jIzYBHLf/MbApAzMEVO1PAwcyMJ1+x8r/3d4np3Ni3cB5+wsFORb8fQHoysGcBu7Ly9FSwPE3Sd05sR7HJWldVlF4rjXK1VNHrvoJhhB+kHQHMJYRflHSnP2qpGcyMIckVezP+Zl/GbBN0voQwo95PAotKogJoMsScgKYA1qN6QE+AyaBjf68AlwCuo1pdeVOe292AQeBK8DWIg65ehWR7JV0TNIDkn5VshrvhBD+jjDtko5KesxTH0l6I4TwRyrXYUlPS7pL0kVJUyGEn+pardvWrHOfWFivAW8BPSlMGZgFFv2ZA0ZSmBJw0jkWnHP3asnttQhviuYOec+1R+S+BB6MMDvcTQY9bncHehZ4CHgKGPfcnkbJtbhA+jJiR4HX7M/G5CLMTmDG/jEX0aQLrxt4ARgAPs+SqXoIDgNncmIbgYr9xYIci/6uesWeSMUfJ+ndQ3k51hVxLPwLlo+n7YakKxG5IOl7LaMkRZ3kuqQy0J8ROyhp3v63wI40ANgl6aqH85KeDCH8GUHukVSSNCDpuyKSuQbsdx8d8jgAhy3CJc+NuCB2xuSAr4HNHm8ALrrAgueGXGz7GiIXvWwcOGdpWATerHWICDPoTlGTmdkauQhTIulCNZk551W+va3eVve6pO1KTh1zkt7OaHWvSnrUU/OSToYQfo8wQVKt1d0p6bKk4w0fFJx0xFp4ALjb+2a6pm/GlCy4L7N0WJj0nqvt0wC8D0yxdFiYIDksDK+GYJXU/cPz0ySNXyTt65bjlgvihP3ngKkMzBhwtlFy5byHvQof2L+W1Qm8ajWh/jBPjIEKbolZVqSDGyTdzIndVLKPJOmvEMItou252j4tyvWL4ysmeF3SFqAzI/aIpEv2bwD3pgGWmZ89vCzp4QxMp6QtftfKzZv9VEwS2AZ8Awx4vNtF0h9h+i3CuzwedEGMRZhO4D3gpYbIRYmOsHRxr5Acv7amMHtITiXxxX1fCjNMcmmvsHRxXx25KHntp4+BAkwgubMs99PHoHOtXxNyTWta0/7j9g8Ok1NNOE3x4gAAAABJRU5ErkJggg==" />
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

import React from "react";
import Router from "next/router";
import { useEffect, useState } from "react";
import ErrorBoundary from "../NotFound/ErrorBoundary";
import HeadConfig from "../Head/Head";
const fillColor = ["#30C4EE", `#006CB7`, `#EE6352`, `#59CD90`, `#F4E04D`];
const getEnvironment = () =>
  process.env.NODE_ENV === "development" ? true : false;
const Layout = ({ children }) => {
  useEffect(() => {
    const SmoothScroll = require("smooth-scroll");
    let scroll = new SmoothScroll('a[href*="#"]', {
      speed: 1200
    });
    const routeStart = url => {
      if (getEnvironment()) {
        console.log("App is changing to: ", url);
      }

    };
    const routeEnd = url => {
      if (getEnvironment()) {
        console.log("App is changed to: ", url);
      }
      const urlReloadList = [
        `/blogs/article/${Router.query.id}`,
        "/resume/ch-cn",
        "/resume/en-us"
      ];
      const ifReload = Promise.resolve(
        urlReloadList.some(each => {
          return each == url;
        })
      );
      ifReload.then(() => Router.reload());
    };
    const routeError = (err, url) => {
      if (err.cancelled) {
        if (getEnvironment()) {
          console.log(`Route to ${url} was cancelled!`);
        }
      }
    };
    Router.events.on("routeChangeError", routeError);
    Router.events.on("routeChangeStart", routeStart);
    Router.events.on("routeChangeComplete", routeEnd);
    return () => {
      Router.events.off("routeChangeStart", routeStart);
      Router.events.off(
        "routeChangeComplete",
        Router.pathname === "/blogs/article/[id]" ? null : routeEnd
      );
      Router.events.off("routeChangeError", routeError);
    };
  }, []);

  return (
    <ErrorBoundary>
      <HeadConfig></HeadConfig>
      <div>
        <noscript>
          <div className="javascript-detect text-center">
            <p>检测到你没有使用JavaScript，为了正常使用本站请启用JavaScript</p>
            <p>
              No JavaScript detected, please enable it and refresh the site for
              a better experience.
            </p>
          </div>
        </noscript>
        {children}
      </div>
    </ErrorBoundary>
  );
};
Layout.getInitialProps = ({ pathname }) => {
  if (pathname === "/youandme") {
    require("../Private/Chat/chat.scss");

    require("../../pages/youandme/youandme.scss");
    return require("../Private/CountDate/countdate.scss");
  }
  return (
    //main scss
    require("../../styles/index.scss"),
    require("../../styles/animation.scss"),
    require("../../styles/buttons.scss"),
    require("../../styles/text.scss"),
    //layout
    require("./Layout.scss"),
    //Header
    require("../Header/Header.scss"),
    require("../Header/Hamburger/Hamburger.scss"),
    require("../Header/DropDown/DropDown.scss"),
    //Footer
    require("../Footer/Footer.scss"),
    //Blog
    require("../../pages/blogs/Blog.scss"),
    require("../Blog/BlogListItem.scss"),
    //Jumbo
    require("../Jumbo/Jumbo.scss"),
    //Background
    require("../Contents/Background/Background.scss"),
    //Login
    require("../Auth/login.scss"),
    //Syntax highlighter
    require("../../styles/prism.css"),
    //Logs
    require("../Contents/Logs/Logs.scss"),
    //Subscribe
    require("../Subscribe/Subscribe.scss")
    //You and me private page
  );
};

export default Layout;

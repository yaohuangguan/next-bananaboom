import React from "react";
import Router from "next/router";
import { useEffect, useState } from "react";
import ErrorBoundary from "../NotFound/ErrorBoundary";
import { getLoading } from "../../utils/Utils";
import HeadConfig from "../Head/Head";
const fillColor = `#eb782e`;

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const SmoothScroll = require("smooth-scroll");
    let scroll = new SmoothScroll('a[href*="#"]', {
      speed: 1200
    });
    const routeStart = url => {
      console.log("App is changing to: ", url);
      setLoading(true);
    };
    const routeEnd = url => {
      console.log("App is changed to: ", url);
      const urlReloadList = [`/blogs/article/${Router.query.id}`,'/resume/ch-cn','/resume/en-us'];
      const ifReload = urlReloadList.some(each => {
        return each == url;
      });
      if (ifReload) {
        console.log("reloaded");
        window.location.reload();
      }
    };
    const routeError = (err, url) => {
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`);
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
        {loading ? getLoading(fillColor) : children}
      </div>
    </ErrorBoundary>
  );
};
Layout.getInitialProps = () => {
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
  );
};

export default Layout;
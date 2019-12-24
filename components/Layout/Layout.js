import React from "react";
import Head from "../Head/Head";
import Router from "next/router";
import { useEffect, useState } from "react";
import ErrorBoundary from "../NotFound/ErrorBoundary";
import { getLoading } from "../Utils/Utils";
// import '../Utils/prism'
// import '../../styles/prism.css'

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
    Router.events.on("routeChangeError", (err, url) => {
      if (err.cancelled) {
        console.log(`Route to ${url} was cancelled!`);
      }
    });
    Router.events.on("routeChangeStart", routeStart);
    Router.events.on("routeChangeComplete", url => {
      console.log("App is changed to: ", url);
      const urlReloadList = [
        `/blogs/article/${Router.query.id}`
      ];
      const ifReload = urlReloadList.some(each => {
        return each == url;
      });
      if (ifReload) {
        console.log("reloaded");
        window.location.reload();
      }
    });
    return () => {
      Router.events.off("routeChangeStart", routeStart);
      Router.events.off("routeChangeComplete");
    };
  }, []);
  return (
    <ErrorBoundary>
      <Head />

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
    require("../../styles/index.scss"),
    require("../../styles/animation.scss"),
    require("../../styles/buttons.scss"),
    require("../../styles/text.scss"),
    require("./Layout.scss"),
    require("../Header/Header.scss"),
    require('../Header/Hamburger/Hamburger.scss'),
    require('../../pages/blogs/Blog.scss'),
    require('../Jumbo/Jumbo.scss'),
    require('../Contents/Background/Background.scss'),
    require('../Auth/login.scss'),
    require('../Utils/prism.js'),
    require('../../styles/prism.css')
  );
};

export default Layout;

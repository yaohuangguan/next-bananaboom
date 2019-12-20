import React from "react";
import Head from "../Head/Head";
import Router from "next/router";
import { useEffect, useState } from "react";
import ErrorBoundary from "../NotFound/ErrorBoundary";
import "../../styles/index.scss";
import "../../styles/animation.scss";

// import '../Utils/prism'
// import '../../styles/prism.css'
const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleRouteChange = url => {
      console.log("App is changing to: ", url);
      setLoading(true);
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
      window.location.reload()
       };
  }, []);
  return (
    <ErrorBoundary>
      <Head />
      <noscript>
      <div className="javascript-detect text-center">
        <p>检测到你没有使用JavaScript，为了正常使用本站请启用JavaScript</p>
        <p>No JavaScript detected, please enable it and refresh the site for a better experience.</p>
      </div>
      </noscript>
      {loading ? (getLoading() ): children}
    </ErrorBoundary>
  );
};



function getLoading() {
  return (
    <>
    
      <div
        className="d-flex justify-content-center"
        style={{
          display: "flex",
          justifyContent: "center",
          height: "60vh",
          alignItems: "center"
        }}
      >
        <div
          className="spinner-border text-secondary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}
export default Layout;

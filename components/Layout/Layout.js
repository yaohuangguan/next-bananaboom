import React from "react";
import Head from "../Head/Head";
import ConsoleLog from "../Utils/Console.log";
import Router from "next/router";
import BrowserTest from "../Utils/BrowserTest";
import { useEffect, useState } from "react";
import ErrorBoundary from "../NotFound/ErrorBoundary";
import "../../styles/index.scss";
import "../../styles/animation.scss";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleRouteChange = url => {
      console.log("App is changing to: ", url);
      setLoading(true);
    };
    ConsoleLog();
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  return (
    <ErrorBoundary>
      <Head />
      <BrowserTest></BrowserTest>
      {loading ? getLoading() : children}
    </ErrorBoundary>
  );
};
function getLoading() {
  return (
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
  );
}
export default Layout;

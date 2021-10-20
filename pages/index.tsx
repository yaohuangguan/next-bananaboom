import { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Jumbo from "../components/Jumbo/Jumbo";

import Subscribe from "../components/Subscribe/Subscribe";
import Footer from "../components/Footer/Footer";
import Animation from "../utils/Animation";
import consolelog from "../utils/Console.log";
import BrowserTest from "../utils/BrowserTest";
import { getHomepage, getLogs, getProjects } from "../service";
import "../styles/index.scss";
export interface IIndexProps {
  homepage: [] | any;
  errors: string;
  logs: any[];
  projects: [];
  currentUser: any;
  handleTheme: () => {};
  lightTheme: () => {};
  darkTheme: () => {};
}
export interface IHomepageDataProps {
  _id: string;
  jumbo_name: string;
  jumbo_welcome: string;
  jumbo_info: string;
  jumbo_button: string;
  intro_title: string;
  intro_subtitle: string;
  intro_intro: string;
  subscribe_web_version: string;
  footer_date: string;
  footer_welcome: string;
  likes: number;
  backgroundURL?: string;
}
const Index = ({
  homepage,
  errors,
  logs,
  projects,
  currentUser,
  handleTheme,
  lightTheme,
  darkTheme,
}: IIndexProps) => {
  const [webUrl, SetWebUrl] = useState("");

  useEffect(() => {
    Animation();
    if (process.env.NODE_ENV === "production") {
      consolelog();
    }
    SetWebUrl(window.location.hostname);

  }, []);
  const {
    _id,
    jumbo_name,
    jumbo_welcome,
    jumbo_info,
    jumbo_button,
    intro_title,
    intro_subtitle,
    intro_intro,
    subscribe_web_version,
    likes,
    backgroundURL,
  }: IHomepageDataProps = homepage[0];
  // const mapWebServiceComponent = () => (
  //   <div className="web-service-entrance">
  //     <span
  //       style={{ marginRight: "20px" }}
  //       onClick={() => {
  //         const node: any = document.querySelector(".web-service-entrance");
  //         node.style.display = "none";
  //       }}
  //     >
  //       X
  //     </span>
  //    全新版本，即将上线
  //   </div>
  // );
  return (
    <Layout head={"Sam的博客"}>
      {/* {mapWebServiceComponent()} */}
      <BrowserTest />
      <Header
        blogName={"Blog"}
        resumeName={"About"}
        resumeRoute={"/resume/[query]"}
        changeLanguageRoute={"/zh"}
        currentUser={currentUser ? currentUser : null}
        handleTheme={handleTheme}
        light={lightTheme}
        dark={darkTheme}
      />
      <Jumbo
        name={jumbo_name}
        welcome={jumbo_welcome}
        info={jumbo_info ? "" : errors}
        button={jumbo_button}
        language={"english"}
        homeRoute={"/"}
        backgroundURL={backgroundURL}
      />

      <div
        className="white-text z-depth-1"
        style={{ backgroundColor: "#333", marginTop: "120px" }}
      >
        <Subscribe
          likes={likes}
          _id={_id}
          title={"Get the lastest blogs notified!"}
          info={" Your information will be secured."}
          copyright={` All rights reserved ©2019-2020  ${
            webUrl || "yaobaiyang.com"
          } `}
          web_version={subscribe_web_version}
          logs_content={logs}
        />
      </div>

      <Footer />
    </Layout>
  );
};
Index.getInitialProps = async () => {
  let errors: string;

  try {
    const urls = [getHomepage, getLogs, getProjects];
    const getData = urls.map(async (cb) => await cb());
    const [homepage, logs, projects] = await Promise.all(getData);

    return {
      homepage,
      logs,
      projects,
    };
  } catch (error) {
    errors = `Sorry, 404. It shows incomplete pages，for the up to date contents，please refresh the page.`;
    return {
      errors,
    };
  }
};

export default Index;

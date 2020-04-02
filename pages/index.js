import { useState, useEffect } from "react";
import api from "../utils/Api";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Jumbo from "../components/Jumbo/Jumbo";
import Intro from "../components/Contents/Intro/English";
import Subscribe from "../components/Subscribe/Subscribe";
import Footer from "../components/Footer/Footer";
import Animation from "../utils/Animation";
import consolelog from "../utils/Console.log";
import BrowserTest from "../utils/BrowserTest";

const Index = ({
  homepage,
  errors,
  logs,
  projects,
  currentUser,
  handleTheme,
  lightTheme,
  darkTheme
}) => {
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
    footer_date,
    footer_welcome,
    likes,
    backgroundURL
  } = homepage[0];

  return (
    <Layout head={"Sam的博客 || www.yaobaiyang.com"}>
      <BrowserTest></BrowserTest>
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
      <div className="mt-3 px-5">
        <Intro
          title={intro_title}
          subtitle={intro_subtitle}
          intro={intro_intro}
          projects={projects}
        ></Intro>
      </div>

      <div
        className="white-text z-depth-1"
        style={{ backgroundColor: "#333", marginTop: "120px" }}
      >
        <Subscribe
          likes={likes}
          _id={_id}
          title={"Get the lastest blogs notified!"}
          info={" Your information will be secured."}
          copyright={` All rights reserved ©2019-2020  ${webUrl ||
            "yaobaiyang.com"} `}
          web_version={subscribe_web_version}
          logs_content={logs}
        />
      </div>

      <Footer date={footer_date} welcome={footer_welcome}></Footer>
    </Layout>
  );
};
Index.getInitialProps = async () => {
  let errors;

  try {
    const urls = [
      "/api/homepage",
      "/api/homepage/logs",
      "/api/homepage/projects"
    ];
    const getData = urls.map(async url => {
      const response = await api.get(url);
      const data = await response.data;
      return data;
    });
    const [homepage, logs, projects] = await Promise.all(getData);

    return {
      homepage,
      logs,
      projects
    };
  } catch (error) {
    errors = `Sorry, 404. It shows incomplete pages，for the up to date contents，please refresh the page.`;
    return {
      errors
    };
  }
};

export default Index;

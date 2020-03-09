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

const Index = ({ homepage, errors, logs, projects, currentUser }) => {
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
    jumbo_name_cn,
    jumbo_welcome,
    jumbo_welcome_cn,
    jumbo_info,
    jumbo_info_cn,
    jumbo_button,
    jumbo_button_cn,
    intro_title,
    intro_title_cn,
    intro_subtitle,
    intro_subtitle_cn,
    intro_intro,
    intro_intro_cn,
    subscribe_web_version,
    subscribe_web_version_cn,
    footer_date,
    footer_date_cn,
    footer_welcome,
    footer_welcome_cn,
    likes,
    backgroundURL
  } = homepage[0];

  return (
    <Layout head={"Sam 个人博客 博客文章 技术文章 生活文章 个人心得"}>
      <BrowserTest></BrowserTest>
      <Header
        blogName={"Blog"}
        resumeName={"About"}
        resumeRoute={"/resume/[query]"}
        homeRoute={"/"}
        changeLanguageRoute={"/zh"}
        currentUser={currentUser ? currentUser : null}
      />
      <Jumbo
        name={jumbo_name}
        welcome={jumbo_welcome}
        info={jumbo_info ? "" : errors}
        button={jumbo_button}
        language={"english"}
        backgroundURL={backgroundURL}
      />
      <div className="container">
        <Intro
          title={intro_title}
          subtitle={intro_subtitle}
          intro={intro_intro}
          projects={projects}
        ></Intro>
        <Subscribe
          likes={likes}
          _id={_id}
          title={"Show some interests? Follow my blog here!"}
          info={
            " Your information will NEVER be disclosed to anyone, any organization, even robots for any purposes. Learn more here for privacy."
          }
          copyright={` All rights reserved ©2019-2020  ${webUrl ||
            "yaobaiyang.com"} `}
          web_version={subscribe_web_version}
          log={" Click here to see logs of updates"}
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

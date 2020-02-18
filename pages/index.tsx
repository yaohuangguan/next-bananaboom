import { useState, useEffect,memo } from "react";
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

const English = ({ homepage, errors, logs, projects, currentUser }) => {
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
    <Layout>
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
        name={jumbo_name || "Sam's blog"}
        welcome={jumbo_welcome || "Always on the road"}
        info={jumbo_info ? "" : errors}
        button={jumbo_button || "Explore"}
        backgroundPicture={true}
        backgroundURL={backgroundURL}
      />
      <div className="container">
        <Intro
          title={intro_title ? intro_title : "Always on the road"}
          subtitle={intro_subtitle ? intro_subtitle : "Hi, I am Sam."}
          intro={
            intro_intro
              ? intro_intro
              : `I am a Full stack developer and designer, open source software contributor at BeeHex 3D food printing. You can also find some of my projects and posts on GitHub and CSDN. This website is being consistently maintained by me and improving its performance and user experience. If you have any good ideas of improving this site, Such as UI&UX, performance ideas, database design or technical tools related, maybe reporting bugs,etc... please go to the bottom of this site and leave a comment!`
          }
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
          web_version={
            subscribe_web_version
              ? subscribe_web_version
              : "Web version: last version"
          }
          log={" Click here to see logs of updates"}
          logs_content={logs}
        />
      </div>

      <Footer
        date={footer_date ? footer_date : "Thanks for visiting!"}
        welcome={footer_welcome ? footer_welcome : "Welcome to my website!"}
      ></Footer>
    </Layout>
  );
};
English.getInitialProps = async req => {
  let errors;

  try {
    const urls = [
      "/api/homepage",
      "/api/homepage/logs",
      "/api/homepage/projects"
    ];
    const [homepage, logs, projects] = await Promise.all(
      urls.map(async url => {
        const response = await api.get(url);
        return await response.data;
      })
    );
    return {
      homepage,
      logs,
      projects
    };
  } catch (error) {
    console.log(error);
    errors = `Sorry, 404. This is an error. The page now is incomplete, in order to have the latest contents, please check your network or refresh the page.`;
  }
  return {
    errors
  };
};

export default English;

import { useState, useEffect } from "react";
import _fetch from "isomorphic-unfetch";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Jumbo from "../components/Jumbo/Jumbo";
import EnglishIntro from "../components/Contents/Intro/English";
import Subscribe from "../components/Subscribe/Subscribe";
import Footer from "../components/Footer/Footer";
import Animation from "../components/Utils/Animation";
import consolelog from "../components/Utils/Console.log";
import BrowserTest from "../components/Utils/BrowserTest";
import Likes from "../components/Likes/Likes";
const dev = process.env.DEV_ENV;
const English = ({ result, errors }) => {

  const [webUrl, SetWebUrl] = useState("");
  useEffect(() => {
    const abortController = new AbortController();
    Animation();
    if (dev == "production") {
      consolelog();
    }
    SetWebUrl(window.location.hostname);
    return () => {
      abortController.abort();
    };
  }, []);
  const {
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
    footer_welcome_cn
  } = result[0];

  return (
    <Layout>
      <BrowserTest></BrowserTest>
      <Header
        login={"Login"}
        blogName={"Blog"}
        resumeName={"Resume"}
        language={"中文"}
        resumeRoute={"/resume/english"}
        homeRoute={"/"}
        changeLanguageRoute={"/chinese"}
      />
      <Jumbo
        name={jumbo_name}
        welcome={jumbo_welcome}
        info={jumbo_info}
        button={jumbo_button}
        backgroundPicture={true}
      />
      <div className="container">
        <EnglishIntro
          title={intro_title}
          subtitle={intro_subtitle}
          intro={intro_intro ? intro_intro : errors}
        ></EnglishIntro>

        <Subscribe
          title={"Show some interests? Follow my blog here!"}
          info={
            " Your information will NEVER be disclosed to anyone, any organization, even robots for any purposes. Learn more here for privacy."
          }
          copyright={` All rights reserved ©2019  ${webUrl ||
            "www.yaobaiyang.com"} `}
          web_version={subscribe_web_version}
          log={" Click here to see logs of updates"}
        />
        {/* <Likes></Likes> */}
      </div>
      <Footer
        date={footer_date}
        welcome={footer_welcome}
      ></Footer>
    </Layout>
  );
};
English.getInitialProps = async () => {
  let result;
  let errors;
  try {
    const response = await _fetch("http://localhost:5000/api/homepage");
    result = await response.json();
  } catch (error) {
    errors = `Sorry, 404. This is an error. Please check your network or refresh the page.`;
  }

  return {
    result,
    errors
  };
};

export default English;

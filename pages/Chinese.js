import { useState, useEffect } from "react";
import _fetch from "isomorphic-unfetch";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Jumbo from "../components/Jumbo/Jumbo";
import ChineseIntro from "../components/Contents/Intro/Chinese";
import Subscribe from "../components/Subscribe/Subscribe";
import Footer from "../components/Footer/Footer";
import Animation from "../components/Utils/Animation";
import Likes from "../components/Likes/Likes";

const Chinese = ({ result, errors }) => {
  const [webUrl, setwebUrl] = useState("");
  useEffect(() => {
    const abortController = new AbortController();
    Animation();
    setwebUrl(window.location.hostname);
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
      <Header
        login={"登录"}
        blogName={"博客"}
        resumeName={"介绍"}
        language={"English"}
        resumeRoute={"/resume/chinese"}
        homeRoute={"/chinese"}
        changeLanguageRoute={"/"}
      />
      <Jumbo
        name={jumbo_name_cn}
        welcome={jumbo_welcome_cn}
        info={jumbo_info_cn}
        button={jumbo_button_cn}
        backgroundPicture={false}
      />
      <div className="container">
        <ChineseIntro
          title={intro_title_cn}
          subtitle={intro_subtitle_cn}
          intro={intro_intro_cn ? intro_intro_cn : errors}
        ></ChineseIntro>

        <Subscribe
          title={"Show some interests? Follow my blog here!"}
          info={
            " Your information will NEVER be disclosed to anyone, any organization, even robots for any purposes. Learn more here for privacy."
          }
          copyright={` All rights reserved ©2019  ${webUrl ||
            "www.yaobaiyang.com"} `}
          web_version={subscribe_web_version_cn}
          log={" Click here to see logs of updates"}
        />
        {/* <Likes></Likes> */}
      </div>
      <Footer date={footer_date_cn} welcome={footer_welcome_cn}></Footer>
    </Layout>
  );
};
Chinese.getInitialProps = async () => {
  let result;
  let errors;
  try {
    const response = await _fetch("http://localhost:5000/api/homepage");
    result = await response.json();
  } catch (error) {
    errors = `抱歉, 404. 这是一个错误. 请检查网络连接是否正常并尝试刷新页面`;
  }

  return {
    result,
    errors
  };
};
export default Chinese;

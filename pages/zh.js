import { useState, useEffect } from "react";
import api from "../utils/Api";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Jumbo from "../components/Jumbo/Jumbo";
import Intro from "../components/Contents/Intro/English";
import Subscribe from "../components/Subscribe/Subscribe";
import Footer from "../components/Footer/Footer";
import Animation from "../utils/Animation";

const Chinese = ({ homepage, errors, logs, projects, currentUser }) => {
  const [webUrl, setwebUrl] = useState("");
  useEffect(() => {
    Animation();
    setwebUrl(window.location.hostname);
  }, []);
  const {
    _id,
    jumbo_name_cn,
    jumbo_welcome_cn,
    jumbo_info_cn,
    jumbo_button_cn,
    intro_title_cn,
    intro_subtitle_cn,
    intro_intro_cn,
    subscribe_web_version_cn,
    footer_date_cn,
    footer_welcome_cn,
    likes,
    backgroundURL
  } = homepage[0];
  return (
    <Layout head={"Sam 个人博客 博客文章 技术文章 生活文章 个人心得"}>
      <Header
        blogName={"博客"}
        resumeName={"介绍"}
        resumeRoute={"/resume/[query]"}
        homeRoute={"/zh"}
        changeLanguageRoute={"/"}
        currentUser={currentUser ? currentUser : null}
      />
      <Jumbo
        name={jumbo_name_cn}
        welcome={jumbo_welcome_cn}
        info={jumbo_info_cn ? "" : errors}
        button={jumbo_button_cn}
        language={"chinese"}
        backgroundURL={backgroundURL}
      />
      <div className="mt-3 mx-4">
        <Intro
          title={intro_title_cn}
          subtitle={intro_subtitle_cn}
          intro={intro_intro_cn}
          projects={projects}
        ></Intro>
      </div>
      <div
        className="mt-5 pt-5 white-text z-depth-1"
        style={{ backgroundColor: "#333",marginTop:'100px' }}
      >
        <Subscribe
          likes={likes}
          _id={_id}
          title={"对本博客感兴趣？第一时间获取最新博客"}
          info={"Your infomation is secure."}
          copyright={` All rights reserved ©2019-2020  ${webUrl ||
            "yaobaiyang.com"} `}
          web_version={subscribe_web_version_cn}
          logs_content={logs}
        />
      </div>

      <Footer date={footer_date_cn} welcome={footer_welcome_cn}></Footer>
    </Layout>
  );
};
Chinese.getInitialProps = async () => {
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
    errors = `抱歉, 404. 这是一个错误. 现在的页面并不完整，为了保证最新的内容，请检查网络连接是否正常并尝试刷新页面`;
  }

  return {
    errors
  };
};
export default Chinese;

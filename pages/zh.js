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
      <Header
        blogName={"博客"}
        resumeName={"介绍"}
        resumeRoute={"/resume/[query]"}
        homeRoute={"/zh"}
        changeLanguageRoute={"/"}
        currentUser={currentUser ? currentUser : null}
      />
      <Jumbo
        name={jumbo_name_cn || "Sam博客！"}
        welcome={jumbo_welcome_cn || "努力工作 尽情欢乐"}
        info={jumbo_info_cn ? "" : errors}
        button={jumbo_button_cn || "探索"}
        backgroundPicture={false}
        backgroundURL={backgroundURL}
      />
      <div className="container">
        <Intro
          title={intro_title_cn || "永远在路上"}
          subtitle={intro_subtitle_cn || "嗨,我是Sam"}
          intro={
            intro_intro_cn ||
            `我是Web开发工程师和设计师，开源社区贡献者. 你也可以在 GitHub 上找到我的一些项目和在 CSDN 上找到我发布的博客, 我一直在维护该网站，并改善其性能和用户体验。如果你有改善此网站的好主意，可以是任何方面，比如UI,UX，性能优化，数据库设计，技术栈以及浏览时的Bug等，欢迎到网站的底部留下评论！`
          }
          projects={projects}
        ></Intro>

        <Subscribe
          likes={likes}
          _id={_id}
          title={"对本博客感兴趣？输入邮箱加入推送"}
          info={
            "你的邮箱不会被以任何方式向第三方透露，若想了解你的邮箱如何安全地保存，请点击这里"
          }
          copyright={` All rights reserved ©2019-2020  ${webUrl ||
            "yaobaiyang.com"} `}
          web_version={subscribe_web_version_cn || "请更新页面"}
          log={"查看网站版本更新日志"}
          logs_content={logs}
        />
      </div>

      <Footer
        date={footer_date_cn || "感谢访问！"}
        welcome={footer_welcome_cn || "欢迎来到我的网站！"}
      ></Footer>
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
      return await response.data;
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

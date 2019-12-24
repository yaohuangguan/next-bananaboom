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
    likes
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
        name={jumbo_name_cn || 'Sam博客！'}
        welcome={jumbo_welcome_cn||'努力工作 尽情欢乐' }
        info={jumbo_info_cn ? '' : errors}
        button={jumbo_button_cn || '探索'}
        backgroundPicture={false}
      />
      <div className="container">
        <ChineseIntro
          title={intro_title_cn || '永远在路上'}
          subtitle={intro_subtitle_cn || '嗨,我是Sam'}
          intro={intro_intro_cn ||`我是Web开发工程师和设计师，开源社区贡献者. 你也可以在 GitHub 上找到我的一些项目和在 CSDN 上找到我发布的博客, 我一直在维护该网站，并改善其性能和用户体验。如果你有改善此网站的好主意，可以是任何方面，比如UI,UX，性能优化，数据库设计，技术栈以及浏览时的Bug等，欢迎到网站的底部留下评论！`}
        ></ChineseIntro>

        <Subscribe
          title={"Show some interests? Follow my blog here!"}
          info={
            " Your information will NEVER be disclosed to anyone, any organization, even robots for any purposes. Learn more here for privacy."
          }
          copyright={` All rights reserved ©2019  ${webUrl ||
            "www.yaobaiyang.com"} `}
          web_version={subscribe_web_version_cn || '请更新页面'}
          log={" Click here to see logs of updates"}
        />
        {likes ? ( <Likes likes={likes} _id={_id}></Likes>) : null}
       
      </div>
      <Footer date={footer_date_cn || '感谢访问！'} welcome={footer_welcome_cn||'欢迎来到我的网站！'}></Footer>
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
    result ='Error'
    errors = `抱歉, 404. 这是一个错误. 现在的页面并不完整，为了保证最新的内容，请检查网络连接是否正常并尝试刷新页面`;
  }

  return {
    result,
    errors
  };
};
export default Chinese;

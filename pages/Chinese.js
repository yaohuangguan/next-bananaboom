import {useState,useEffect} from "react";
import Layout from '../components/Layout/Layout'
import Header from '../components/Header/Header'
import Jumbo from '../components/Jumbo/Jumbo'
import Content from '../components/Contents/Intro/Chinese'
import Subscribe from '../components/Subscribe/Subscribe'
import Footer from '../components/Footer/Footer'
import Animation from "../components/Utils/Animation";
import uk from "../public/uk.png";

const Chinese = () => {
  const [webUrl, setwebUrl] = useState('')
  useEffect(() => {
    const abortController = new AbortController()
    Animation();
    setwebUrl(window.location.hostname)
    return () => {
      abortController.abort()
    };
  }, [])

    return (
      <Layout>
        <Header
          flag={uk}
          clothing={"服装购物"}
          vueTube={"VueTube"}
          blogName={"博客"}
          resumeName={"介绍"}
          language={"English"}
          resumeRoute={"/resume/chinese"}
          homeRoute={"/chinese"}
          changeLanguageRoute={"/"}
        />
        <Jumbo
          name={"Sam的博客"}
          welcome={"努力工作  尽情玩乐"}
          info={""}
          button={"探索网站"}
          backgroundPicture={false}
        />
        <div className="container">
          <Content></Content>
          <Subscribe
            title={"感觉本网站还不错? 在这里跟随博客！"}
            info={
              " 你的信息不会以任何目的被泄露给任何人，任何组织及第三方，甚至机器人。"
            }
            copyright={`All rights reserved ©2019  ${webUrl ||
              "www.yaobaiyang.com"}`}
            web_version={"网站版本：3.4; 基于Next.js框架React版本:16.10.2;"}
            log={"点击查看网站更新记录"}
          />
        </div>
        <Footer
          date={"上一次更新日期：2019年11月26号 感谢来访！"}
          welcome={"欢迎来到我的网站! 🚀"}
        />
      </Layout>
    );
  
}

export default Chinese;

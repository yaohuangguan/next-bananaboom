import { useState, useEffect } from "react";
import Layout from '../components/Layout/Layout'
import Header from "../components/Header/Header";
import Jumbo from "../components/Jumbo/Jumbo";
import Content from "../components/Contents/Intro/English";
import Subscribe from "../components/Subscribe/Subscribe";
import Footer from "../components/Footer/Footer";
import Animation from "../components/Utils/Animation";
import china from "../public/china.png";
import consolelog from "../components/Utils/Console.log";
import BrowserTest from '../components/Utils/BrowserTest'
import styled from "styled-components";

const English = () => {
  const [webUrl, SetWebUrl] = useState("");
  useEffect(() => {
    const abortController = new AbortController()
    Animation();
    consolelog();
    SetWebUrl(window.location.hostname);
    return () => {
      abortController.abort()
    };
  }, []);

  return (

      <Layout>
        <BrowserTest></BrowserTest>
        <Header
          flag={china}
          clothing={"Shopping Clothes"}
          vueTube={"VueTube"}
          blogName={"Blog"}
          resumeName={"Resume"}
          language={"中文"}
          resumeRoute={"/resume/english"}
          homeRoute={"/"}
          changeLanguageRoute={"/chinese"}
        />
        <Jumbo
          name={"Sam's Blog!!"}
          welcome={"Always on the road"}
          info={""}
          button={"Take a tour"}
          backgroundPicture={true}
        />
        <div className="container">
          <Content></Content>
          <Subscribe
            title={"Show some interests? Follow my blog here!"}
            info={
              " Your information will NEVER be disclosed to anyone, any organization, even robots for any purposes. Learn more here for privacy."
            }
            copyright={` All rights reserved ©2019  ${webUrl ||
              "www.yaobaiyang.com"} `}
            web_version={" Website version: 3.4; Built on Next.js React v16.10.2"}
            log={" Click here to see logs of updates"}
          />
        </div>
        <Footer
          date={"Last update: 2019/11/26  Thanks for coming!"}
          welcome={"Welcome to my website!  have fun!🚀"}
        ></Footer>
      </Layout>

  );
};

export default English;

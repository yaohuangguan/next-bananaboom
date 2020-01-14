import Link from "next/link";
import { useState, useEffect } from "react";
import china from "../../public/china.png";
import uk from "../../public/uk.png";
import ResumeList from "../../components/Contents/Resume/ResumeList/ResumeList";
import Layout from "../../components/Layout/Layout";
import Head from "next/head";
import api from "../../utils/Api";
import { withRouter } from "next/router";
import shuffle from "../../utils/Shuffle";
import {
  getEnglishContent,
  getChineseContent
} from "../../components/Contents/Resume/Content";
const Resume = ({ resumeItem, errors, router }) => {
  const flipFlag = () => {
    const flag = document.querySelector(".flag");
    flag.classList.add("animated", "rotateIn");
    flag.addEventListener("animationend", () =>
      flag.classList.remove("animated", "rotateIn")
    );
  };

  return (
    <Layout>
      <Head>
        <title>Application Board</title>
      </Head>
      <div className="container">
        {router.asPath == "/resume/en-us" ? (
          <div className="float-right pt-2">
            <Link href="/resume/[query]" as={`/resume/ch-cn`}>
              <a className="btn-hover color-5">
                <img
                  src={china}
                  alt="china-flag"
                  onMouseOver={flipFlag}
                  className="flag"
                  title="This is to credit the author by Flaticon, thank you"
                />
                中文
              </a>
            </Link>
          </div>
        ) : (
          <div className="float-right pt-2">
            <Link href="/resume/[query]" as={`/resume/en-us`}>
              <a className="btn-hover color-5">
                <img
                  src={uk}
                  alt="uk-flag"
                  onMouseOver={flipFlag}
                  className="flag"
                  title="This is to credit the author by Flaticon, thank you"
                />
                English
              </a>
            </Link>
          </div>
        )}

        <br />
        <br />
        <br />
        <Link href={router.asPath == "/resume/en-us" ? "/" : "/chinese"}>
          <a className="btn draw-border-blue waves-effect">
            {router.asPath == "/resume/en-us" ? "Back" : "返回"}
          </a>
        </Link>
        <h3 className="text-center">Sam</h3>
        {router.asPath === "/resume/en-us"
          ? getEnglishContent()
          : getChineseContent()}

        <br />
        <h5>Projects</h5>
        {resumeItem ? <ResumeList items={resumeItem} /> : errors}

        <p>More in Github...</p>
        <br />
        {router.asPath === "/resume/en-us" ? (
          <div className="english-content-involvment">
            <h5>Involvement</h5>
            <p>Harvard Model United Nations</p>
            <p>Delegate of Chad , Volunteer</p>
            <p>
              Represented Chad in the UNDP and debated the critical issue of
              water pollution. The final result turned out to be good that we
              mostly agreed super nations should take more responsibilities and
              help other nations with more resources to prevent pollution
              together.
            </p>
            <p>
              Volunteered for the other conference rooms and passing the note
              through delegates in my spare time.
            </p>
            <br />
            <h5>Tools,Honors</h5>
            <p>
              Git, HTML, CSS, Sass, Linux, JavaScript, Vue.js, React, Bootstrap,
              Node.js, Express.js, Postman, Python, PostgreSQL, MongoDB, Knowing
              how HTTP, TCP/IP, DNS and Web Server work
            </p>
            <p>
              Honor:
              <a href="https://meritpages.com/samyao" target="blank">
                Dean’s List
              </a>{" "}
              (Top 10% in department)
            </p>
          </div>
        ) : (
          <div className="chinese-content-involvment">
            <h5>参与</h5>
            <h4>
              <b>哈佛模拟联合国</b>
            </h4>
            <p>乍得代表与志愿者</p>
            <p>
              代表乍得参加开发计划署，并辩论水污染这一关键问题。最终结果是我们大多同意大国应该承担更多的责任，帮助其他国家更多技术上的支持，共同防治水污染。
            </p>
            <p>为其他时间参会大厅做志愿者，传递代表交流纸条等</p>
            <br />
            <h5>技能，荣誉</h5>
            <p>
              Git, HTML, CSS, Sass, Linux, JavaScript, Vue.js, React, Bootstrap,
              Node.js, Express.js, Python, Postman, PostgreSQL, MongoDB, Knowing
              how HTTP, TCP/IP, DNS and Web Server work
            </p>
            <p>
              <a href="https://meritpages.com/samyao" target="blank">
                院长名单(学院前10%)
              </a>
            </p>
          </div>
        )}

        <br />
      </div>
    </Layout>
  );
};
Resume.getInitialProps = async () => {
  let data;
  let shuffled;
  let errors;
  try {
    const response = await api.get("/api/resume");
    data = await response.data;
    shuffled = shuffle(data);
  } catch (error) {
    errors = `Something wrong with the server or check your network connect and try again later.`;
  }
  return {
    resumeItem: shuffled,
    errors: errors
  };
};

export default withRouter(Resume);

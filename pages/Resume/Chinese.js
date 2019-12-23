import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import uk from "../../public/uk.png";
import Head from "next/head";
import _fetch from "isomorphic-unfetch";
import ResumeList from "./ResumeList/ResumeList";
import shuffle from "../../components/Utils/Shuffle";
import {getChineseContent} from '../../components/Contents/Resume/Content'
const Resume = ({ resumeItem,errors }) => {
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
        <title>介绍和程序列表</title>
      </Head>
      <div className="container">
        <div className="float-right pt-2">
          <Link href="/resume/english">
            <a className='btn-hover color-5'>
              <img
                src={uk}
                alt="usa-flag"
                className="flag"
                onMouseOver={flipFlag}
                title="This is to credit the author by Flaticon, thank you"
              />
              English
            </a>
          </Link>
        </div>

        <br />
        <br />
        <br />
        <Link href="/chinese">
          <a className="btn draw-border-blue waves-effect">返回</a>
        </Link>
        <h3 className="text-center">Sam</h3>
        {getChineseContent()}

        <br />
        <h5 id="project">项目</h5>
        {resumeItem ? <ResumeList items={resumeItem} /> : (errors)}

        <p>More in Github...</p>
        <br />

        <h5>参与</h5>
        <p>哈佛模拟联合国</p>
        <p>乍得代表与志愿者</p>
        <p>
          代表乍得参加开发计划署，并辩论水污染这一关键问题。最终结果是我们大多同意大国应该承担更多的责任，帮助其他国家更多技术上的支持，共同防治水污染。
        </p>
        <p>为其他时间参会大厅做志愿者，传递代表交流纸条等</p>
        <br />
        <h5>技能，荣誉</h5>
        <p>
          Git, HTML, CSS, Sass, Linux, JavaScript, Vue.js, React, Bootstrap,
          Node.js, Express.js, Python, Postman, PostgreSQL, MongoDB, Knowing how
          HTTP, TCP/IP, DNS and Web Server work
        </p>
        <p>
          <a href="https://meritpages.com/samyao" target="blank">
            院长名单(学院前10%)
          </a>
        </p>
        <br />
      </div>
    </Layout>
  );
};

Resume.getInitialProps = async ({ req }) => {
  let data
  let shuffled
  let errors
 try {
  const response = await _fetch("http://localhost:5000/api/posts/resume");
  data = await response.json();
  shuffled = shuffle(data);
 } catch (error) {
   errors = `Something wrong with the server or check your network connect and try again later.`
 }
  return {
    resumeItem: shuffled,
    errors:errors
  };
};

export default Resume;

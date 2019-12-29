import React from "react";
import Link from "next/link";
import china from '../../public/china.png'
import ResumeList from "./ResumeList/ResumeList";
import Layout from "../../components/Layout/Layout";
import Head from "next/head";
import _fetch from "isomorphic-unfetch";
import shuffle from "../../components/Utils/Shuffle";
import { getEnglishContent } from "../../components/Contents/Resume/Content";
const Resume = ({ resumeItem, errors }) => {
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
        <div className="float-right pt-2">
          <Link href="/resume/chinese">
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

        <br />
        <br />
        <br />
        <Link href="/">
          <a className="btn draw-border-blue waves-effect">Back</a>
        </Link>
        <h3 className="text-center">Sam</h3>
        {getEnglishContent()}

        <br />
        <h5>Projects</h5>
        {resumeItem ? <ResumeList items={resumeItem} /> : errors}

        <p>More in Github...</p>
        <br />

        <h5>Involvement</h5>
        <p>Harvard Model United Nations</p>
        <p>Delegate of Chad , Volunteer</p>
        <p>
          Represented Chad in the UNDP and debated the critical issue of water
          pollution. The final result turned out to be good that we mostly
          agreed super nations should take more responsibilities and help other
          nations with more resources to prevent pollution together.
        </p>
        <p>
          Volunteered for the other conference rooms and passing the note
          through delegates in my spare time.
        </p>
        <br />
        <h5>Tools,Honors</h5>
        <p>
          Git, HTML, CSS, Sass, Linux, JavaScript, Vue.js, React, Bootstrap,
          Node.js, Express.js, Postman, Python, PostgreSQL, MongoDB, Knowing how
          HTTP, TCP/IP, DNS and Web Server work
        </p>
        <p>
          Honor:
          <a href="https://meritpages.com/samyao" target="blank">
            Dean’s List
          </a>{" "}
          (Top 10% in department)
        </p>
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
    const response = await _fetch("http://localhost:3000/api/resumes");
    data = await response.json();
    shuffled = shuffle(data);
  } catch (error) {
    errors = `Something wrong with the server or check your network connect and try again later.`;
  }
  return {
    resumeItem: shuffled,
    errors: errors
  };
};

export default Resume;

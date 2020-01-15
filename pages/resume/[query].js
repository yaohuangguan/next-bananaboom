import Link from "next/link";
import Background from '../../components/Contents/Background/Background'
import china from '../../public/static/china.png'
import uk from "../../public/static/uk.png";
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
        <div className="row">
          {router.asPath === "/resume/en-us" ? (
            <div className="english-content-involvment col-md-12 m-0">
              <h5>Involvement</h5>
              <p>Harvard Model United Nations</p>
              <p>Delegate of Chad , Volunteer</p>
              <p>
                Represented Chad in the UNDP and debated the critical issue of
                water pollution. The final result turned out to be good that we
                mostly agreed super nations should take more responsibilities
                and help other nations with more resources to prevent pollution
                together.
              </p>
              <p>
                Volunteered for the other conference rooms and passing the note
                through delegates in my spare time.
              </p>
              <br />
              <h5>Tools,Honors</h5>
              <p>
                Git, HTML, CSS, Sass, Linux, JavaScript, Vue.js, React,
                Bootstrap, Node.js, Express.js, Postman, Python, PostgreSQL,
                MongoDB, Knowing how HTTP, TCP/IP, DNS and Web Server work
              </p>
              <p>
                Honor:
                <a
                  href="https://meritpages.com/samyao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dean’s List
                </a>{" "}
                (Top 10% in department)
              </p>
              <h5>Interests</h5>
              <p>
                Read some tech books，any kind of sports，including basketball,
                workout, swimming,etc... And room escape!
              </p>
              
            </div>
          ) : (
            <div className="chinese-content-involvment col-md-12 m-0">
              <h5>参与</h5>
              <h5>哈佛模拟联合国峰会</h5>
              <p>乍得国家代表&大会志愿者</p>
              <p>
                代表乍得参加开发计划署，并辩论水污染这一关键问题。最终结果是我们大多同意大国应该承担更多的责任，帮助其他国家更多技术上的支持，共同防治水污染。
              </p>
              <p>为其他时间参会大厅做志愿者，传递代表交流纸条等</p>
              <br />
              <h5>技能，荣誉</h5>
              <p>
                Git, HTML, CSS, Sass, Linux, JavaScript, Vue.js, React,
                Bootstrap, Node.js, Express.js, Python, Postman, PostgreSQL,
                MongoDB, Knowing how HTTP, TCP/IP, DNS and Web Server work
              </p>
              <p>
                <a
                  href="https://meritpages.com/samyao"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  院长名单(学院前10%)
                </a>
              </p>
              <h5>爱好</h5>
              <p>看些技术书，各项运动，篮球，健身，游泳等。密室逃脱</p>
             
            </div>
          )}
         
        </div>
            <Background></Background>
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

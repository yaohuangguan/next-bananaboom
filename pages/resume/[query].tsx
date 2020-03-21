import Link from "next/link";
import Background from "../../components/Contents/Background/Background";
import china from "../../public/china.png";
import uk from "../../public/uk.png";
import ResumeList from "../../components/Contents/Resume/ResumeList/ResumeList";
import Layout from "../../components/Layout/Layout";
import api from "../../utils/Api";
import { withRouter } from "next/router";
import shuffle from "../../utils/Shuffle";
import GitHub from "../../components/Github/Github.forkme";
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
  const changeLang = () => {
    return (
      <div className="pt-2">
        <Link
          href="/resume/[query]"
          as={`/resume/${router.asPath == "/resume/en-us" ? "ch-cn" : "en-us"}`}
        >
          <a
            className="bg-info white-text p-1"
            style={{ borderRadius: "20px" }}
          >
            <img
              src={router.asPath == "/resume/en-us" ? china : uk}
              alt="language-flag"
              width="25px"
              onMouseOver={flipFlag}
              className="flag"
              title="This is to credit the author by Flaticon, thank you"
            />
            <span>{router.asPath == "/resume/en-us" ? "中文" : "English"}</span>
          </a>
        </Link>
      </div>
    );
  };
  return (
    <Layout head={"Sam's about page 关于Sam的个人生活爱好等"}>
      <GitHub />
      <div className="container">
        <Link href={router.asPath == "/resume/en-us" ? "/" : "/zh"}>
          <a className="btn draw-border-blue waves-effect">
            {router.asPath == "/resume/en-us" ? "Back" : "返回"}
          </a>
        </Link>
        {changeLang()}

        <h3 className="text-center">Sam</h3>
        {router.asPath === "/resume/en-us"
          ? getEnglishContent()
          : getChineseContent()}

        <br />
        <h5 className="text-primary">Projects</h5>
        {resumeItem ? <ResumeList items={resumeItem} /> : errors}

        <p>More in Github...</p>
        <br />
        <div className="row">
          {router.asPath === "/resume/en-us" ? (
            <div className="english-content-involvment col-md-12 m-0">
              <h5 className="blue-text">Involvement</h5>
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
              <h5 className="blue-text">Tools,Honors</h5>
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
              <h5 className="blue-text">Interests</h5>
              <p>
                Travelling, I've been to Canada, France, Austria, The United
                States, China, Japan, Korea. I always love travelling and keep
                exploring more new places. Creating stuff, create some new
                websites, planting some fresh vegetable and plants, drawing some
                portraits. Reading some tech books，I also love playing any kind
                of sports，including basketball, workout, swimming,etc... And
                room escape!
              </p>
            </div>
          ) : (
            <div className="chinese-content-involvment col-md-12 m-0">
              <h5 className="blue-text">参与</h5>
              <h5>哈佛模拟联合国峰会</h5>
              <p>乍得国家代表&大会志愿者</p>
              <p>
                代表乍得参加开发计划署，并辩论水污染这一关键问题。最终结果是我们大多同意大国应该承担更多的责任，帮助其他国家更多技术上的支持，共同防治水污染。
              </p>
              <p>为其他时间参会大厅做志愿者，传递代表交流纸条等</p>
              <br />
              <h5 className="blue-text">技能，荣誉</h5>
              <p>
                Git, HTML, CSS, Sass, Linux, JavaScript, Vue.js, React,
                Bootstrap, Node.js, Express.js, Python, Postman, PostgreSQL,
                MongoDB, Knowing how HTTP, TCP/IP, DNS and Web Server work
              </p>
              <p>
                <a
                  href="https://miamioh.meritpages.com/stories/Baiyang-Yao-Named-To-Dean-s-List-at-Miami-University-/12472471"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  院长名单(学院前10%)
                </a>
              </p>
              <h5 className="blue-text">爱好</h5>
              <p>
                旅行，我去过加拿大，法国，奥地利，美国，中国，日本，韩国。我总是喜欢去旅行，不断探索更多的新地方。创造东西，创建一些新的网站，养一些新鲜植物，还有画画。读一些科技书籍，我也喜欢参加任何运动，包括篮球，
                健身、游泳等， 以及密室逃脱！
              </p>
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

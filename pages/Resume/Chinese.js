import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import uk from "../../public/uk.png";
import Head from "next/head";
import _fetch from "isomorphic-unfetch";
import ResumeList from "./ResumeList/ResumeList";
import shuffle from "../../components/Utils/Shuffle";
const Resume = ({ resumeItem }) => {
  return (
    <Layout>
      <Head>
        <title>介绍和程序列表</title>
      </Head>
      <div className="container">
        <div className="float-right pt-2">
          <Link href="/resume/english">
            <a>
              <img
                src={uk}
                alt="usa-flag"
                className="flag"
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
          <a className="btn btn-outline-info btn-rounded waves-effect">返回</a>
        </Link>
        <h3 className="text-center">Sam</h3>

        <p>迈阿密大学</p>
        <p>交互研究 GPA:3.7</p>
        <p>主要研究方向: Web理论和技术研究</p>
        <p>相关课程: Web应用编程, Web交互编程, HCI理论和可用性</p>
        <br />

        <h5>前端开发工程师 at BeeHex </h5>
        <p>
          BeeHex 是一家 NASA 的子公司，利用食品行业最先进的 3D
          打印和机器人系统，使食品制备和个性化现代化。
        </p>
        <p>
          在4人团队中工作，职责主要集中在创建用户友好的Vue.js应用，前端性能优化，跨域测试防御攻击，安全支付，供客户可以在线购买我们的机器打印的饼干/蛋糕
        </p>
        <p>
          所负责项目与美国大型超市Target和沃尔玛合作，并且计划向美国全国开展业务
        </p>
        <p>负责使用AWS EC2云服务器并成功搭建了Nginx服务器来运行App</p>
        <p>
          公司核心项目附属于美国航天局NASA，并与美国陆军合作来为军人和宇航员制定营养计划
        </p>

        <br />
        <h5 id="project">项目</h5>
        {resumeItem ? <ResumeList items={resumeItem} /> : "出现了错误"}

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
  const response = await _fetch("http://localhost:5000/api/posts/resume");
  const data = await response.json();
  const shuffled = shuffle(data);
  if (req) {
    console.log("server");
  } else {
    console.log("client");
  }
  return {
    resumeItem: shuffled
  };
};

export default Resume;

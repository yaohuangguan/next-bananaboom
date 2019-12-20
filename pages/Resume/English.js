import React from "react";
import Link from "next/link";
import china from "../../public/china.png";
import ResumeList from "./ResumeList/ResumeList";
import Layout from "../../components/Layout/Layout";
import Head from 'next/head'
import _fetch from 'isomorphic-unfetch'
import shuffle from "../../components/Utils/Shuffle";
const Resume = ({ resumeItem }) => {

  return (
    <Layout>
    <Head>
      <title>Application Board</title>
    </Head>
      <div className="container">
        <div className="float-right pt-2">
          <Link href="/resume/chinese">
            <a>
              <img
                src={china}
                alt="china-flag"
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
          <a className="btn btn-outline-info btn-rounded waves-effect">Back</a>
        </Link>
        <h3 className="text-center">Sam</h3>

        <h5>Education:</h5>
        <p>Miami University</p>
        <p>Bachelor of Art in Interactive Media Studies (STEM Major) GPA:3.7</p>
        <p>Major Concentration: Website Technology</p>
        <p>
          Relevant Courses: Web Application Programming, Web Interaction
          Programming, HCI theory and usability
        </p>
        <br />

        <h5>Software Engineer at BeeHex </h5>
        <p>
          BeeHex is a NASA spin-off company modernizing food preparation and
          personalization with the most advanced 3D printing and robotics system
          in the food industry.
        </p>
        <p>
          Worked in a team of 4, my duty mainly focused on creating more user
          friendly and interactive Vue.js app, front end performance optimizing
          and CORS testing and preventing website attacks. Providing customers
          to purchase our machine printed cookie/cake online.
        </p>
        <p>
          Responsible for using AWS EC2 computing cloud and successfully
          creating the Nginx web server to run the application.
        </p>
        <p>
          This website project will be cooperating with Target and Walmart and
          our service will be nationwide in the future
        </p>
        <p>
          Company’s core project is NASA spin off project and we are working
          with US Army to create the personalized nutrition plans for the
          astronaut and soldiers.
        </p>

        <br />
        <h5>Projects</h5>
        {resumeItem ? (
          <ResumeList items={resumeItem} />
        ) : (
          "Error occured, please refresh"
        )}

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
  const response = await _fetch('http://localhost:5000/api/posts/resume')
  const data = await response.json()
  const shuffled = shuffle(data)
  return {
    resumeItem:shuffled
  }
};

export default Resume;

import React from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
import Image from "../public/image";
// tslint:disable

function Error({ statusCode }) {
  return (
    <Layout head={"页面发生了错误，请刷新页面然后尝试 | yaobaiyang.com"}>
      <div className="text-secondary" style={{ height: "100vh" }}>
        <div className="row text-center">
          <div className="col-md-6 pt-5" style={{ margin: "0 auto" }}>
            <h1>Oops! This is an error!</h1>

            <h3>
              Error: {statusCode} <br />
            </h3>

            <br />
            <a>
              <Image
                src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582125657/%E8%80%81%E5%A9%86%E7%9A%84%E7%88%B1_fxvtnv.gif"
                style={{ marginLeft: "10%" }}
                width="90%"
                alt="404"
                title="image credit to my girlfriend^"
              />
            </a>

            <Link href="/">
              <a className="btn btn-outline-secondary">Take me back</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;

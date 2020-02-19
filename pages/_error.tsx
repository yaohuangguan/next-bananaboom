import React from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
function Error({ statusCode, message }) {
  return (
    <Layout>
      <div className="text-secondary" style={{ height: "100vh" }}>
        <div className="row text-center">
          <div className="col-md-6 pt-5">
            <h3>Oops! This is an error!</h3>

            <h3>
              Error:{statusCode} <br />
              {message}
            </h3>

            <br />
            <img
              src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582040878/WechatIMG5636_s7pzyf.png"
              style={{marginLeft:'7%'}}
              width='80%'
              alt="404"
              title="女朋友做的^^"
            />
            <div className="mx-auto">
              <Link href="/">
                <input
                  type="button"
                  className="btn btn-outline-secondary btn-xl"
                  value={"Take Me Back Now!!!"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const message = res ? res.statusCode : err ? err.message : "Error out";
  return { statusCode, message };
};

export default Error;

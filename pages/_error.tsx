import React from "react";
import Layout from "../components/Layout/Layout";
import Link from "next/link";
function Error({ statusCode,message }) {
  return (
    <Layout>
      <div className="text-secondary" style={{ height: "100vh" }}>
        <div className="row">
          <div className="col-md-6 mx-auto pt-5 text-center">

            <h3>
              Error:{statusCode} <br />
             {message}
            </h3>

            <br />
            <h3>Oops! This is an error!</h3>
            <img src="https://aradseyr.com/en/wp-content/images/no-results.png" alt="404" />
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
  const message = err && err.message
  return { statusCode, message };
};

export default Error;

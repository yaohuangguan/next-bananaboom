import Layout from "../../../components/Layout/Layout";
import { useRouter, withRouter } from "next/router";
import Head from "next/head";
import _fetch from "isomorphic-unfetch";
import { useEffect } from "react";
require("../../../components/Utils/prism");
require("../../../styles/prism.css");
const blog = ({ content }) => {
  const router = useRouter();
  useEffect(() => {
    console.log("hi");
  }, []);
  return (
    <Layout>
      <Head>
        <title>{content.name || `Waiting for fetch...`} || By Sam Yao</title>
      </Head>
      <div className="container">
        <a
          title="Go Back"
          onClick={e => {
            e.preventDefault();
            router.replace('/blogs/blog');
          }}
          className="btn draw-border-blue waves-effect"
        >
          <span className="text-dark">Go Back</span>
        </a>
        <section className="my-5 px-4 article">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            {content.name || `Waiting for fetch...`}
          </h2>
          <p>{content.content || `Something went wrong...`}</p>

          <pre>
            <code className="language-javascript">{content.code}</code>
          </pre>
          {content.code2 ? (
            <div>
              {"Method 2"}
              <pre>
                <code className="language-javascript">{content.code2} </code>{" "}
              </pre>
            </div>
          ) : null}
        </section>
      </div>
    </Layout>
  );
};

blog.getInitialProps = async router => {
  const response = await _fetch("http://localhost:5000/api/posts");
  const posts = await response.json();
  return {
    content: posts.find(post => post._id == router.query.id)
  };
};

export default withRouter(blog);

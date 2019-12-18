import Layout from "../../../components/Layout/Layout";
import React from "react";
import { useRouter, withRouter } from "next/router";
import Playground from "component-playground";
import Head from 'next/head'
import BLOG from "../BLOG_DATA";
const blog = ({ content }) => {
  const router = useRouter();

  return (
    <Layout>
    <Head>
      <title>{content.name} || By Sam Yao</title>
    </Head>
      <div className="container">
        <a
          title="Go Back"
          onClick={e => {
            e.preventDefault();
            router.back();
          }}
          className="btn btn-outline-info btn-rounded waves-effect"
        >
          Go back
        </a>
        <section className="my-5 px-4 article">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            {content.name}
          </h2>

          <p>{content.content}</p>
          <Playground codeText={content.code} scope={{ React: React }} />
          {content.code2 ? (
            <Playground codeText={content.code2} scope={{ React: React }} />
          ) : `Take what you need man.`}
        </section>
      </div>
    </Layout>
  );
};

blog.getInitialProps = router => {
  return {
    content: BLOG.find(blog => blog.id == router.query.id)
  };
};

export default withRouter(blog);

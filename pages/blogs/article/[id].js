import Layout from "../../../components/Layout/Layout";
import { useRouter, withRouter } from "next/router";
import Head from "next/head";
import api from "../../../utils/Api";
import { useEffect } from "react";
import Comment from "../../../components/Blog/Comments/Comments";

const blog = ({ posts, comments, currentUser }) => {
  const router = useRouter();
  useEffect(() => {
    require("../../../utils/prism");
  }, []);
  const { name, content, code, code2, _id } = posts;
  return (
    <Layout>
      <Head>
        <title>{name || `Waiting for fetch...`} || By Sam Yao</title>
      </Head>
      <div className="container">
        <a
          title="Go Back"
          onClick={e => {
            e.preventDefault();
            router.replace("/blogs/blog");
          }}
          className="btn draw-border-blue"
        >
          <span className="text-dark">Go Back</span>
        </a>
        <section className="my-5 px-4 article">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            {name || `Waiting for fetch...`}
          </h2>
          <p style={{ lineHeight: "40px" }}>
            {content || `Something went wrong...`}
          </p>

          {code ? (
            <pre>
              <code className="language-javascript">{code}</code>
            </pre>
          ) : null}
          {code2 ? (
            <div>
              {"Method 2"}
              <pre>
                <code className="language-javascript">{code2} </code>
              </pre>
            </div>
          ) : null}
        </section>
        <Comment
          comments={comments}
          _id={_id}
          currentUser={currentUser}
        ></Comment>
      </div>
    </Layout>
  );
};

blog.getInitialProps = async router => {
  const response = await api.get(`/api/posts/${router.query.id}`);
  const comments = await api.get(`/api/comments/${router.query.id}`);
  const content = await response.data;
  const commentsResponse = await comments.data;
  return {
    posts: content[0],
    comments: commentsResponse
  };
};

export default withRouter(blog);

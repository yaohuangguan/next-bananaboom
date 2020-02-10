import Layout from "../../../components/Layout/Layout";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import api from "../../../utils/Api";
import { useEffect, useState } from "react";
import CanvasAnimation from "../../meteor";
const Comment = dynamic(() =>
  import("../../../components/Blog/Comments/Comments")
);

const blog = ({ posts, comments, currentUser, router }) => {
  const [loadComment, setloadComment] = useState("");
  const { name, content, code, code2, _id } = posts;
  useEffect(() => {
    require("../../../utils/prism");
    const contentDiv = document.getElementById("content-field");
    if (typeof content === "String") {
      const temp = document.createElement("div");
      temp.innerHTML = content;

    }  else {
      contentDiv.innerHTML = content;

    }
  }, []);
  return (
    <Layout>
      <Head>
        <title>{name || `Waiting for fetch...`} || By Sam Yao</title>
      </Head>
      {content ? null : <CanvasAnimation></CanvasAnimation>}

      <div className="container">
        <a
          title="Go Back"
          onClick={e => {
            e.preventDefault();
            router.replace("/blogs");
          }}
          className="btn draw-border-blue"
        >
          <span className="text-dark">Go Back</span>
        </a>

        <section className="my-5 px-4 article">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            {name}
          </h2>
          <div style={{ lineHeight: "40px" }} id="content-field"></div>

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

blog.getInitialProps = async ({ query }) => {
  const { id } = query;
  const response = await api.get(`/api/posts/${id}`);
  const comments = await api.get(`/api/comments/${id}`);
  const content = await response.data;
  const commentsResponse = await comments.data;
  return {
    posts: content[0],
    comments: commentsResponse
  };
};

export default withRouter(blog);

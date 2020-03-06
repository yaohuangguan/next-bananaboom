import Layout from "../../../components/Layout/Layout";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import api from "../../../utils/Api";
import { useEffect, useState } from "react";
import SpecialWrapper from '../../../components/Special/SpecialWrapper/Wrapper'
import Pay from '../../../components/Blog/Pay/Pay'
const Comment = dynamic(() =>
  import("../../../components/Blog/Comments/Comments")
);

const blog = ({ posts, comments, currentUser, router }) => {

  const { name, content, code, code2, _id , project_id } = posts;

  useEffect(() => {
    document.title = name;
    require("../../../utils/prism");
    const contentDiv = document.getElementById("content-field");
    if (typeof content === "string") {
      // const temp = document.createElement("div");
      // const textNode = document.createTextNode(temp)
      // temp.appendChild(textNode)
      contentDiv.innerHTML = content;

    } 
  }, []);
  // console.log(typeof content)
  // console.log(project_id)
  return (
    <Layout>
      <Head>
        <title>{name} | yaobaiyang.com</title>
      </Head>
      {content ? null : <SpecialWrapper project={project_id} ></SpecialWrapper>}

      <div className="container">
        <a
          title="Go Back"
          onClick={e => {
            e.preventDefault();
            router.replace("/blogs");
          }}
          className="btn draw-border-black"
        >
          <span className='text-dark'>Go Back</span>
        </a>

        <section className="my-5 px-4 article">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            {name}
          </h2>
          <div style={{ lineHeight: "40px" }} id="content-field"></div>

          {code ? (
            <div>
              源码
              <pre>
                <code className="language-javascript">{code}</code>
              </pre>
            </div>
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
            <Pay></Pay>
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
  const urls = [`/api/posts/${id}`, `/api/comments/${id}`];
  const mapUrls = urls.map(async url => {
    const response = await api.get(url);
    return await response.data;
  });
  const [posts, comments] = await Promise.all(mapUrls);
  return {
    posts: posts[0],
    comments
  };
};

export default withRouter(blog);

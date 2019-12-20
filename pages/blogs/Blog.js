/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(()=>import("../../components/Layout/Layout"),{
  ssr:false
})
import { useRouter } from "next/router";
import BlogList from "../../components/Blog/BlogList";
import "./Blog.scss";
import _fetch from "isomorphic-unfetch";
import Canvas from "../../components/Jumbo/Canvas";
import Head from "next/head";
const Blog = props => {
  const { blogs } = props;
  const router = useRouter();
 
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>Blog Posts</title>
        <meta property="og:title" content="Sam的博客" />
      </Head>

        <div className="100vw blog" >
          <div className="text-white text-center  rgba-stylish-light py-5 px-5">
            <div className="py-5">
              <a
                className="btn btn-outline-white btn-rounded waves-effect"
                onClick={e => {
                  e.preventDefault();
                  router.back();
                }}
              >
                Go back
              </a>

              <h2 className="card-title h2 my-4 py-2">博客 Blogs</h2>
              <p className="mb-4 pb-2 px-md-5 mx-md-5">
                以下内容皆是个人见解，并不一定具有权威性。很多是我从事前端开发后通过个人学习和感触得来，不希望代表权威性，但希望能给读者带来启发。
                <br />
                Those posts are purely my personal aspects towards front end
                engineering which do not stand for authority, but to enlighten
                and inspire readers.
              </p>
            </div>
          </div>
        </div>


      
      {blogs ? (
        <div className="container">
          <BlogList blogs={blogs} />
        </div>
      ) : (
        "Something went wrong, please check your network and try again!"
      )}
      <hr className="my-5" />

     
    </Layout>
  );
};
Blog.getInitialProps = async () => {
  const response = await _fetch("http://localhost:5000/api/posts");
  const posts = await response.json();
  return {
    blogs: posts
  };
};

export default Blog;

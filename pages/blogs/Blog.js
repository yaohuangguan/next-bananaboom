/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import BlogList from "../../components/Blog/BlogList";
import "./Blog.scss";
import BLOG_DATA from "./BLOG_DATA";
import Canvas from "../../components/Jumbo/Canvas";
import Head from "next/head";
import Lightbox from "../../components/Blog/Lightbox/Lightbox";
const Blog = props => {
  const { blogs } = props;

  let blogList = [].concat(blogs);

  const router = useRouter();

  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>前端文章</title>
        <meta property="og:title" content="Sam的博客" />
      </Head>
      <Canvas>
        <div className="100vw" style={{ position: "absolute" }}>
          <div className="text-white text-center py-5 px-5">
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
      </Canvas>

      <div className="container">
        <a className="badge badge-default" onClick={() => blogs.reverse()}>
          按日期顺序
        </a>
      </div>
      {blogs ? (
        <div className="container">
          <BlogList blogs={blogs} />
        </div>
      ) : (
        "Something went wrong, please check your network and try again!"
      )}
      <hr className="my-5" />

      <div className="container">
        <Lightbox />
      </div>
    </Layout>
  );
};
Blog.getInitialProps = () => {
  return {
    blogs: BLOG_DATA
  };
};

export default Blog;

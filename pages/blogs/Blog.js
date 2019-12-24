/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import Link from 'next/link'
import BlogList from "../../components/Blog/BlogList";
import _fetch from "isomorphic-unfetch";
import Head from "next/head";
require('./Blog.scss')

const Blog = ({ blogs, errors }) => {
  useEffect(() => {
    const heroShrinker = () => {
      let header = document.querySelector(".shrinkedHeader");
      let blog = document.querySelector(".blog");
      let heroHeight = header.clientHeight;
      window.addEventListener("scroll", () => {
        let scrollOffset = scrollY;
        if (scrollOffset > blog.clientHeight) {
          header.classList.remove("shrinkedHeader");
          header.classList.add("shrinked");
          blog.classList.add("emptyHeight");
        } else {
          header.classList.add("shrinkedHeader");
          header.classList.remove("shrinked");
          blog.classList.remove("emptyHeight");
        }
        if (scrollOffset > heroHeight - 215) {
          header.classList.add("fixme");
        } else {
          header.classList.remove("fixme");
        }
      });
    };
    heroShrinker();
  }, []);
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <meta charSet="utf-8" />
        <title>Blog Posts</title>
        <meta property="og:title" content="Sam的博客" />
      </Head>
      <div className="shrinkedHeader">
        <a
          className="btn draw-border-white waves-effect"
          onClick={e => {
            e.preventDefault();
            router.back()
          }} >
          Go back
        </a>
        
      </div>
      <div className="blog">
        <div className="text-white text-center rgba-stylish-light  px-5">
          <div className="py-5">
            <a
              className="btn draw-border-white waves-effect"
              onClick={e => {
                e.preventDefault();
                router.back()
              }}
            >
              Go back
            </a>
            <br />
            <h4 className="card-title my-4 py-2" style={{fontSize:'2.7rem'}}>Blogs</h4>
            <p className="mb-4 pb-2 px-md-5 mx-md-5">
              以下内容皆是个人见解，并不一定具有权威性。很多是我从事前端开发后通过个人学习和感触得来，不希望代表权威性，但希望能给读者带来启发。
              <br />
              Those posts are purely my personal aspects towards front end
              engineering which do not stand for authority, but to enlighten and
              inspire readers.
            </p>
          </div>
        </div>
      </div>

      {blogs ? (
        <div className="container">
          <BlogList blogs={blogs} />
        </div>
      ) : (
        <p>{errors}</p>
      )}
      <hr className="my-5" />
    </Layout>
  );
};

Blog.getInitialProps = async () => {
  require('./Blog.scss')

  let posts;
  let errors;
  try {
    const response = await _fetch("http://localhost:5000/api/posts");
    posts = await response.json();
  } catch (error) {
    errors = `Sorry, network issue happened, please check your internet or come back later! Thank you. \n
    `;
  }

  return {
    blogs: posts,
    errors: errors
  };
};

export default Blog;

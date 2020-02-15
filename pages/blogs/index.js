/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import BlogList from "../../components/Blog/BlogList";
import api from "../../utils/Api";
import Head from "next/head";
import SearchBox from "../../components/SearchBox/SearchBox";

const Blog = ({ blogs, errors, currentUser }) => {
  const router = useRouter();

  const [searchField, setsearchField] = useState("");
  const [filteredBlog, setfilteredBlog] = useState([]);
  const handleChange = e => setsearchField(e.target.value);
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
  useEffect(() => {
    const result =
      blogs &&
      blogs.filter(blog =>
        blog.name.toLowerCase().includes(searchField.toLowerCase())
      );
    setfilteredBlog(result);
  }, [searchField]);

  
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
            router.back();
          }}
        >
          Go back
        </a>
      </div>
      <div className="blog">
        <div className="text-white text-center rgba-stylish-light px-5">
        
          <div className="py-5">
            <a
              className="btn draw-border-white waves-effect"
              onClick={e => {
                e.preventDefault();
                router.back();
              }}
            >
              Go back
            </a>{" "}
            <h4 className="card-title my-4 py-2" style={{ fontSize: "2.7rem" }}>
              Blogs
            </h4>
            <p className="mb-4 pb-2 px-md-5 mx-md-5">
              以下内容皆是个人见解，并不一定具有权威性。很多是我从事Web开发后通过个人学习和感触得来，不希望代表权威性，但希望能给读者带来启发。
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
          <SearchBox
            searchField={searchField}
            handleChange={handleChange}
          ></SearchBox>
          {filteredBlog.length == 0
            ? "没有找到相关文章 No result matches"
            : null}

          <BlogList blogs={filteredBlog} />
        </div>
      ) : (
        <p>{errors}</p>
      )}
    </Layout>
  );
};

Blog.getInitialProps = async () => {
  let posts;
  let errors;
  try {
    const response = await api.get("/api/posts");
    posts = await response.data;
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

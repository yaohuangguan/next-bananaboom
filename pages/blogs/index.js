/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import BlogList from "../../components/Blog/BlogList";
import api from "../../utils/Api";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import GitHub from "../../components/Github/Github.forkme";
const Blog = ({ blogs, errors, currentUser, handleTheme }) => {
  const router = useRouter();
  const [searchField, setsearchField] = useState("");
  const [filteredBlog, setfilteredBlog] = useState([]);
  const handleChange = e => setsearchField(e.target.value);
  // if (typeof window !== "undefined") {
  //   router.beforePopState(({ url, as, option }) => {
  //     // I only want to allow these two routes!
  //     if (typeof url == "undefined") {
  //       // Have SSR render bad routes as a 404.
  //       history.back();

  //       return false;
  //     }

  //     return true;
  //   });
  // }
  useEffect(() => {
    let header = document.querySelector(".shrinkedHeader");
    let blog = document.querySelector(".blog");
    let heroHeight = header.clientHeight;

    const shrinkHeader = () => {
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
    };
    window.addEventListener("scroll", shrinkHeader, true);

    return () => {
      window.removeEventListener("scroll", shrinkHeader, true);
    };
  }, []);
  useEffect(() => {
    // if (typeof Worker !== "undefined") {
    //   let worker = new Worker("./worker/Worker.js");

    //   worker.onmessage = e => {
    //     const result = e.data;
    //     setfilteredBlog(result);
    //   };
    //   worker.postMessage({ blogs, searchField });
    // }
    const result =
      blogs &&
      blogs.filter(blog => {
        let temp = blog.name + blog.info + blog.tags.map(each => each);
        return temp.toLowerCase().includes(searchField.toLowerCase());
      });
    setfilteredBlog(result);
  }, [searchField]);
  const goBack = e => {
    e.preventDefault();
    router.back();
  };
  const searchSuggestion = e => {
    let value = e.target.innerText;
    setsearchField(value);
  };
  return (
    <Layout
      head={"Sam 个人博客 博客文章 技术文章 生活文章 个人心得 Blog Posts"}
    >
      <GitHub fill="#fff" color="#333" />
      <div className="shrinkedHeader">
        <a className="btn draw-border-white" onClick={goBack}>
          Go back
        </a>
      </div>
      <div className="blog">
        <div className="text-white text-center px-5">
          <div className="py-5">
            <a className="btn draw-border-white" onClick={goBack}>
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
            blogs={blogs}
            searchSuggestion={searchSuggestion}
            theme={handleTheme}
          ></SearchBox>
          {filteredBlog.length == 0
            ? "没有找到相关文章 No result matches"
            : null}

          <BlogList blogs={filteredBlog} handleTheme={handleTheme} />
        </div>
      ) : (
        <Loader color={"text-secondary"}></Loader>
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
    errors: errors,
    loading: true
  };
};

export default Blog;

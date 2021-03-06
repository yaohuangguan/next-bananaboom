import Layout from "../../../components/Layout/Layout";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import SpecialWrapper from "../../../components/Special/SpecialWrapper/Wrapper";
import Pay from "../../../components/Blog/Pay/Pay";
import { getBlogContent, getCommentList } from "../../../service";
const Comment = dynamic(() =>
  import("../../../components/Blog/Comments/Comments")
);
interface IBlogProps {
  posts: {
    name: string;
    content?: string;
    code?: string | [];
    code2?: string | [];
    _id: string;
    project_id?: string;
    codeGroup?:[]
  };
  comments: any;
  currentUser: any;
  router: any;
  handleTheme: () => {};
}
const blog = ({
  posts,
  comments,
  currentUser,
  router,
  handleTheme,
}: IBlogProps) => {
  const { name, content, code, code2, _id, project_id, codeGroup } = posts;
  const [theme, setTheme] = useState("");

  function handleThemeBeforeServer() {
    if (typeof window !== "undefined") {
      let theme: any = handleTheme();
      return setTheme(theme);
    }
  }
  function renderEditorContent() {
    const contentDiv = document.getElementById("content-field");
    if (typeof content === "string") {
      // const temp = document.createElement("div");
      // const textNode = document.createTextNode(temp)
      // temp.appendChild(textNode)
      contentDiv.innerHTML = content;
    }
  }
  useEffect(() => {
    document.title = name;
    handleThemeBeforeServer();
    require("../../../utils/prism");
    renderEditorContent();
  }, []);
  // console.log(typeof content)
  // console.log(project_id)
  return (
    <Layout head={`${name}`}>
      {content ? null : <SpecialWrapper project={project_id} />}

      <div className="container">
        <a
          title="Go Back"
          onClick={(e) => {
            e.preventDefault();
            router.replace("/blogs");
          }}
          className={`btn ${
            theme === "night" ? "draw-border-white" : "draw-border-black"
          }`}
        >
          <span
            className={`${theme === "night" ? "white-text" : "black-text"}`}
          >
            Go Back
          </span>
        </a>

        <section className="my-5 px-4 article">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            {name}
          </h2>
          <div
            style={{ lineHeight: "40px", wordWrap: "break-word" }}
            id="content-field"
          ></div>
          {codeGroup &&
            codeGroup.length > 0 &&
            codeGroup.map((code) => (
              <div className="my-2">
                <pre>
                  <code className="language-javascript">{code}</code>
                </pre>
              </div>
            ))}
          {code && (
            <div>
              源码
              <pre>
                <code className="language-javascript">{code}</code>
              </pre>
            </div>
          )}
          {/* // ) : (
          //   code.map((param) => (
          //     <pre>
          //       <code className="language-javascript">{param}</code>
          //     </pre>
          //   ))
          // )} */}
          {code2 ? (
            <div>
              {"Method 2"}
              <pre>
                <code className="language-javascript">{code2} </code>
              </pre>
            </div>
          ) : null}
        </section>
        <Pay />
        <Comment
          comments={comments}
          _id={_id}
          currentUser={currentUser}
        />
      </div>
    </Layout>
  );
};

blog.getInitialProps = async ({ query }) => {
  const { id } = query;
  const urls = [getBlogContent, getCommentList];
  const mapUrls = urls.map(async (cb) => await cb(id));
  const [posts, comments] = await Promise.all(mapUrls);
  return {
    posts: posts[0],
    comments,
  };
};

export default withRouter(blog);

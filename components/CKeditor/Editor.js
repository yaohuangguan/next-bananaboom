import { useState, useEffect, useReducer } from "react";
import CKEditor from "ckeditor4-react";
import { useRouter } from "next/router";
import api from "../../utils/Api";
import Loader from "../Loader/Loader";
import Emitter from "../../utils/EventEmitter";
const INITIAL_STATE = {
  content: localStorage.getItem("cachedText") || "",
  author: localStorage.getItem("authorText") || "",
  code: localStorage.getItem("codeText") || "",
  info: localStorage.getItem("infoText") || "",
  title: localStorage.getItem("titleText") || "",
  tags: localStorage.getItem("tagText") || "",
  isPrivate: false,
  errors: "",
  loading: false,
  result: ""
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CONTENT":
      return { ...state, content: payload };
    case "AUTHOR":
      return { ...state, author: payload };
    case "CODE":
      return { ...state, code: payload };
    case "INFO":
      return { ...state, info: payload };
    case "TITLE":
      return { ...state, title: payload };
    case "TAG":
      return { ...state, tags: payload };
    case "ISPRIVATE":
      return { ...state, isPrivate: payload };
    case "ERROR":
      return { ...state, errors: payload };
    case "LOADING":
      return { ...state, loading: payload };
    case "RESULT":
      return { ...state, result: payload };
    case "RESET":
      return {
        content: "",
        author: "",
        code: "",
        info: "",
        title: "",
        tags: "",
        isPrivate: false,
        errors: "",
        loading: false,
        result: ""
      };
    default:
      throw new Error();
  }
};
const Editor = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    content,
    author,
    code,
    info,
    title,
    tags,
    isPrivate,
    errors,
    loading,
    result
  } = state;

  // const [blogText, setblogText] = useState("");
  // const [author, setauthor] = useState("");
  // const [code, setcode] = useState("");
  // const [info, setinfo] = useState("");
  // const [title, settitle] = useState("");
  // const [tags, settags] = useState("");
  // const [isPrivate, setisPrivate] = useState(false);
  // const [content, setcontent] = useState("");
  // const [errors, seterrors] = useState("");
  const handleEditorChange = evt => {
    // console.log( evt.editor.document.getBody().getText() )
    const data = evt.editor.getData();
    localStorage.setItem("cachedText", data);

    const blog = document.getElementById("blog-text");
    blog.innerHTML = data || localStorage.getItem("cachedText");
    dispatch({ type: "CONTENT", payload: data });
  };
  const handleAuthorChange = e => {
    localStorage.setItem("authorText", e.target.value);
    dispatch({ type: "AUTHOR", payload: e.target.value });
  };
  const handleCodeChange = e => {
    localStorage.setItem("codeText", e.target.value);
    dispatch({ type: "CODE", payload: e.target.value });
  };
  const handleInfoChange = e => {
    localStorage.setItem("infoText", e.target.value);
    dispatch({ type: "INFO", payload: e.target.value });
  };
  const handleTitleChange = e => {
    localStorage.setItem("titleText", e.target.value);
    dispatch({ type: "TITLE", payload: e.target.value });
  };
  const handleTagsChange = e => {
    localStorage.setItem("tagText", e.target.value);
    dispatch({ type: "TAG", payload: e.target.value });
  };
  const handlePrivateChange = e => {
    console.log(e.target.checked);
    dispatch({ type: "ISPRIVATE", payload: e.target.checked });
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    if (
      author.trim() == "" ||
      info.trim() == "" ||
      title.trim() == "" ||
      tags.trim() == "" ||
      content.trim() == ""
    ) {
      return dispatch({ type: "ERROR", payload: "未填写完整" });
    }
    try {
      if (!loading) {
        dispatch({ type: "LOADING", payload: true });
        const response = await api.post("/api/posts", {
          author,
          info,
          name: title,
          tags,
          isPrivate,
          content,
          code
        });
        const data = await response.data;
        Emitter.dispatch("getNewPrivatePosts", data);
        dispatch({ type: "RESULT", payload: "发布成功！" });
        setTimeout(() => {
          dispatch({ type: "RESET" });
        }, 1000);
        localStorage.removeItem("cachedText");
        localStorage.removeItem("codeText");
        localStorage.removeItem("authorText");
        localStorage.removeItem("infoText");
        localStorage.removeItem("titleText");
        localStorage.removeItem("tagText");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: "发生了错误，刷新下网页" });
      dispatch({ type: "LOADING", payload: false });
    }
  };
  return (
    <>
      <div
        id="blog-text"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "20px",
          borderRadius: "50px",
          marginBottom: "20px"
        }}
      >
        <span className="text-muted">预览界面</span>
      </div>
      <form
        className="input-section"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "20px",
          borderRadius: "50px",
          marginBottom: "20px"
        }}
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="author">
          作者*
          <input
            type="text"
            value={author}
            className="editor-input"
            onChange={handleAuthorChange}
          />
        </label>
        <label htmlFor="info">
          简介*
          <input
            type="text"
            value={info}
            className="editor-input"
            onChange={handleInfoChange}
          />
        </label>
        <label htmlFor="code">
          代码
          <input
            type="text"
            value={code}
            className="editor-input"
            onChange={handleCodeChange}
          />
        </label>
        <label htmlFor="title">
          标题*
          <input
            type="text"
            value={title}
            className="editor-input"
            onChange={handleTitleChange}
          />
        </label>
        <label htmlFor="tags">
          归类*
          <input
            type="text"
            value={tags}
            className="editor-input"
            onChange={handleTagsChange}
          />
        </label>
        <br />
        <label htmlFor="private">
          私密*
          <input
            type="checkbox"
            id="checkbox"
            value={isPrivate || false}
            onChange={handlePrivateChange}
          />
        </label>
        <CKEditor
          data={content}
          config={{
            language: "zh-cn",
            height: "40em",
            uiColor: "#DFD0F0",
            extraPlugins:
              "colorbutton,colordialog,iframe,font,smiley,preview,templates"
          }}
          onChange={handleEditorChange}
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
        ></CKEditor>
        {errors ? <div className="text-danger">Error: {errors}</div> : null}
        {result ? <div className="text-success">Message: {result}</div> : null}
        <button
          className="btn-block p-3"
          style={{ backgroundColor: "#DFD0F0" }}
          type="submit"
        >
          {!loading ? "发送" : <Loader />}
        </button>
      </form>
    </>
  );
};

export default Editor;

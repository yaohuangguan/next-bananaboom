import { useState, useEffect, useReducer } from "react";
import CKEditor from "ckeditor4-react";
import { useRouter } from "next/router";
import Loader from "../Loader/Loader";
import Emitter from "../../utils/EventEmitter";
import { CreateNewPost } from "../../service";
import C from './constants'
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
  result: "",
};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.CONTENT:
      return { ...state, content: payload };
    case C.AUTHOR:
      return { ...state, author: payload };
    case C.CODE:
      return { ...state, code: payload };
    case C.INFO:
      return { ...state, info: payload };
    case C.TITLE:
      return { ...state, title: payload };
    case C.TAG:
      return { ...state, tags: payload };
    case C.ISPRIVATE:
      return { ...state, isPrivate: payload };
    case C.ERROR:
      return { ...state, errors: payload };
    case C.LOADING:
      return { ...state, loading: payload };
    case C.RESULT:
      return { ...state, result: payload };
    case C.RESET:
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
        result: "",
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
    result,
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
  const handleEditorChange = (evt) => {
    // console.log( evt.editor.document.getBody().getText() )
    const data = evt.editor.getData();
    localStorage.setItem("cachedText", data);

    const blog = document.getElementById("blog-text");
    blog.innerHTML = data || localStorage.getItem("cachedText");
    dispatch({ type: C.CONTENT, payload: data });
  };
  const handleAuthorChange = (e) => {
    localStorage.setItem("authorText", e.target.value);
    dispatch({ type: C.AUTHOR, payload: e.target.value });
  };
  const handleCodeChange = (e) => {
    localStorage.setItem("codeText", e.target.value);
    dispatch({ type: C.CODE, payload: e.target.value });
  };
  const handleInfoChange = (e) => {
    localStorage.setItem("infoText", e.target.value);
    dispatch({ type: C.INFO, payload: e.target.value });
  };
  const handleTitleChange = (e) => {
    localStorage.setItem("titleText", e.target.value);
    dispatch({ type: C.TITLE, payload: e.target.value });
  };
  const handleTagsChange = (e) => {
    localStorage.setItem("tagText", e.target.value);
    dispatch({ type: C.TAG, payload: e.target.value });
  };
  const handlePrivateChange = (e) => {
    console.log(e.target.checked);
    dispatch({ type: C.ISPRIVATE, payload: e.target.checked });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      author.trim() == "" ||
      info.trim() == "" ||
      title.trim() == "" ||
      tags.trim() == "" ||
      content.trim() == ""
    ) {
      return dispatch({ type: C.ERROR, payload: "未填写完整" });
    }
    let codeGroup;
    try {
      if (!loading) {
        dispatch({ type: C.LOADING, payload: true });
        if(code && code.includes('分割')) {
          codeGroup = code.split('分割');
        } else {
          codeGroup = code
        }

        const response = await CreateNewPost({
          author,
          info,
          name: title,
          tags,
          isPrivate,
          content,
          codeGroup,
        });
        const data = await response.data;
        Emitter.dispatch("getNewPrivatePosts", data);
        dispatch({ type: C.RESULT, payload: "发布成功！" });
        setTimeout(() => {
          dispatch({ type: C.RESET });
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
      dispatch({ type: C.ERROR, payload: "发生了错误，刷新下网页" });
      dispatch({ type: C.LOADING, payload: false });
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
          marginBottom: "20px",
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
          marginBottom: "20px",
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
          归类* <span className="text-muted">(空格分隔多个标签)</span>
          <input
            type="text"
            value={tags}
            className="editor-input"
            onChange={handleTagsChange}
          />
        </label>
        <label htmlFor="code">
          代码
          <span className="text-muted">[数组](用'分割'隔开多个)</span>
          <textarea
            type="text"
            value={code}
            className="editor-textarea"
            onChange={handleCodeChange}
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
              "colorbutton,colordialog,iframe,font,smiley,preview,templates",
          }}
          onChange={handleEditorChange}
          onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
        ></CKEditor>
        {errors ? <div className="text-danger">Error: {errors}</div> : null}
        {result ? <div className="text-success">Message: {result}</div> : null}
        <button
          className="btn-block p-3"
          style={{ backgroundColor: "#DFD0F0", outline: "none" }}
          type="submit"
        >
          {!loading ? (
            <i className="fas fa-paper-plane fa-lg white-text"></i>
          ) : (
            <Loader />
          )}
        </button>
      </form>
    </>
  );
};

export default Editor;

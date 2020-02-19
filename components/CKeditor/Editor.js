import { useState, useEffect, useReducer } from "react";
import CKEditor from "ckeditor4-react";
import { useRouter } from "next/router";
import api from "../../utils/Api";
const INITIAL_STATE = {
  blogText: "",
  author: "",
  code: "",
  info: "",
  title: "",
  tags: "",
  isPrivate: false,
  content: "",
  errors: ""
};
const reducer = (state, action) => {
  switch (action.type) {
    case "BLOG":
      return { ...state, blogText: action.payload };
    case "AUTHOR":
      return { ...state, author: action.payload };
    case "CODE":
      return { ...state, code: action.payload };
    case "INFO":
      return { ...state, info: action.payload };
    case "TITLE":
      return { ...state, title: action.payload };
    case "TAG":
      return { ...state, tags: action.payload };
    case "ISPRIVATE":
      return { ...state, isPrivate: action.payload };
    case "CONTENT":
      return { ...state, content: action.payload };
    case "ERROR":
      return { ...state, errors: action.payload };
    case "RESET":
      return {
        blogText: "",
        author: "",
        code: "",
        info: "",
        title: "",
        tags: "",
        isPrivate: false,
        content: "",
        errors: ""
      };
    default:
      throw new Error();
  }
};
const Editor = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    blogText,
    author,
    code,
    info,
    title,
    tags,
    isPrivate,
    content,
    errors
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
    const blog = document.getElementById("blog-text");
    blog.innerHTML = data;
    dispatch({ type: "CONTENT", payload: data });
  };
  const handleAuthorChange = e => {
    console.log(e.target.value);
    dispatch({ type: "AUTHOR", payload: e.target.value });
  };
  const handleCodeChange = e => {
    console.log(e.target.value);
    dispatch({ type: "CODE", payload: e.target.value });
  };
  const handleInfoChange = e => {
    console.log(e.target.value);

    dispatch({ type: "INFO", payload: e.target.value });
  };
  const handleTitleChange = e => {
    console.log(e.target.value);

    dispatch({ type: "TITLE", payload: e.target.value });
  };
  const handleTagsChange = e => {
    console.log(e.target.value);
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
      tags.trim() == ""
    ) {
      return dispatch({ type: "ERROR", payload: "都要填的，老婆" });
    }
    try {
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

      dispatch({type:'RESET'})
      router.reload();
    } catch (error) {
      console.log(error);
      dispatch({type:'ERROR',payload:'发生了错误，刷新下网页'})
    }
  };
  return (
    <>
      <div id="blog-text"></div>
      <form className="input-section w-100" style={{backgroundColor:'rgba(255,255,255,0.6)',padding:'20px',borderRadius:'50px', marginBottom:'20px'}} onSubmit={handleFormSubmit}>
        {errors ? <div className="text-danger">{errors}</div> : null}
        <label htmlFor="author">
          作者
          <input type="text" value={author} className='editor-input' onChange={handleAuthorChange} />
        </label>
        <label htmlFor="info">
          文章简介
          <input type="text" value={info} className='editor-input' onChange={handleInfoChange} />
        </label>
        <label htmlFor="code">
          代码
          <input type="text" value={code} className='editor-input' onChange={handleCodeChange} />
        </label>
        <label htmlFor="title">
          标题
          <input type="text" value={title} className='editor-input' onChange={handleTitleChange} />
        </label>
        <label htmlFor="tags">
          文章归类
          <input type="text" value={tags} className='editor-input' onChange={handleTagsChange} />
        </label>
        <br />
        <label htmlFor="private">
          私密
          <input
            type="checkbox"
            className='editor-input'
            id='checkbox'
            value={isPrivate || false}
            onChange={handlePrivateChange}
          />
        </label>
        <CKEditor
          data={blogText}
          config={{
            language: "zh-cn",
            uiColor: "#DFD0F0",
            extraPlugins:
              "colorbutton,colordialog,iframe,font,smiley,preview,templates"
          }}
          onChange={handleEditorChange}
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
        ></CKEditor>
        <button className="btn-block p-3" style={{backgroundColor:'#DFD0F0'}} type="submit">
          发送
        </button>
      </form>
    </>
  );
};

export default Editor;

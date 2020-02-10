import { useState, useEffect } from "react";
import CKEditor from "ckeditor4-react";
import {useRouter} from 'next/router'
import api from "../../utils/Api";
const Editor = () => {
  const router = useRouter()
  const [blogText, setblogText] = useState("");
  const [author, setauthor] = useState("");
  const [info, setinfo] = useState("");
  const [title, settitle] = useState("");
  const [tags, settags] = useState("");
  const [isPrivate, setisPrivate] = useState("");
  const [content, setcontent] = useState("");
  const [errors, seterrors] = useState("");
  const handleEditorChange = evt => {
    // console.log( evt.editor.document.getBody().getText() )
    const data = evt.editor.getData();
    const blog = document.getElementById("blog-text");
    blog.innerHTML = data;
    setcontent(data);
  };
  const handleAuthorChange = e => {
    console.log(e.target.value);
    setauthor(e.target.value);
  };
  const handleInfoChange = e => {
    console.log(e.target.value);

    setinfo(e.target.value);
  };
  const handleTitleChange = e => {
    console.log(e.target.value);

    settitle(e.target.value);
  };
  const handleTagsChange = e => {
    console.log(e.target.value);
    settags(e.target.value);
  };
  const handlePrivateChange = e => {
    console.log(e.target.checked);
    setisPrivate(e.target.checked);
  };
  const handleFormSubmit = async e => {
    e.preventDefault();
    if (
      author.trim() == "" ||
      info.trim() == "" ||
      title.trim() == "" ||
      tags.trim() == "" ||
      !isPrivate
    ) {
      return seterrors("都要填的,老婆");
    }
    try {
      const response = await api.post("/api/posts", {
        author,
        info,
        name: title,
        tags,
        isPrivate,
        content
      });
      const data = await response.data;
      seterrors('')
      settitle('')
      setinfo('')
      setauthor('')
      settags('')
      setisPrivate('')
      router.reload()

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="blog-text"></div>
      <form className="input-section w-100" onSubmit={handleFormSubmit}>
        {errors ? <div className="text-danger">{errors}</div> : null}
        <label htmlFor="author">
          作者
          <input type="text" value={author} onChange={handleAuthorChange} />
        </label>
        <label htmlFor="info">
          文章简介
          <input type="text" value={info} onChange={handleInfoChange} />
        </label>
        <label htmlFor="title">
          标题
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label htmlFor="tags">
          文章归类
          <input type="text" value={tags} onChange={handleTagsChange} />
        </label>
        <br />
        <label htmlFor="private">
          私密
          <input
            type="checkbox"
            value={isPrivate}
            onChange={handlePrivateChange}
          />
        </label>
        <CKEditor
          data={blogText}
          config={{
            language: "zh-cn",
            uiColor: "#bb8bfa",
            extraPlugins:
              "colorbutton,colordialog,iframe,font,smiley,preview,templates"
          }}
          onChange={handleEditorChange}
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
        ></CKEditor>
        <button className="btn-sm btn-secondary" type="submit">
          提交
        </button>
      </form>
    </>
  );
};

export default Editor;

import { useState, useEffect } from "react";
import Comment from "../../Blog/Comments/Comments";
import Loader from "../../Loader/Loader";
import { getCommentList, deletePost } from "../../../service";
import EventEmitter from "../../../utils/EventEmitter";
export interface IPrivatePostItemProps {
  tags?: string[];
  name?: string;
  info?: string;
  author?: string;
  content?: string;
  id?: any;
  createdDate?: string;
  code?: string;
  currentUser?: any;
  index: number;
  length: number;
}
const PrivatePostItem = (props: IPrivatePostItemProps) => {
  const {
    tags,
    name,
    info,
    author,
    content,
    id,
    createdDate,
    code,
    currentUser,
    index,
    length,
  } = props;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [triggerComment, setTriggerComment] = useState(false);
  useEffect(() => {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = content;

    return () => {};
  }, []);
  useEffect(() => {
    const fetchCommentList = async () => {
      setLoading(true);
      try {
        const response = await getCommentList(id);
        setComments(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommentList();
  }, []);
  const handleDeletePost = async () => {
    const res = confirm("are you sure");
    if (!res) return;
    if(currentUser.email !== 'yaob@miamioh.edu') return alert('老婆无权限操作')
    const response = await deletePost(id);
    console.log(response);
    EventEmitter.dispatch("getNewPrivatePosts", response);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: "#FF69B4", fontSize: "30px" }}>{name}</span>
        <span style={{ fontSize: "15px" }}>
          第<code>{length - index}</code>/{length}篇
        </span>
        <span
          style={{
            padding: "5px",
            fontSize: "30px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={handleDeletePost}
        >
          X
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <code>{info}</code>
        <code>作者:{author}</code>
        <code>类别:{tags.map((tag) => tag + ";")}</code>
        <code>日期:{createdDate}</code>
        <code>{code ? code : null}</code>
      </div>

      <div id={id} style={{ overflowX: "auto" }}></div>
      <div
        className="btn btn-sm bg-light text-dark"
        onClick={() => setTriggerComment(!triggerComment)}
      >
        {loading ? <Loader /> : `评论(${comments.length})`}
      </div>
      {triggerComment && (
        <Comment comments={comments} _id={id} currentUser={currentUser} />
      )}
    </>
  );
};

export default PrivatePostItem;

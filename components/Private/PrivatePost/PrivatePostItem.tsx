import { useState, useEffect } from "react";
import api from "../../../utils/Api";
import Comment from "../../Blog/Comments/Comments";
import axios from 'axios'
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
  } = props;
  const [comments, setComments] = useState([]);
  const [triggerComment, setTriggerComment] = useState(false);
  useEffect(() => {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = content;

    return () => {};
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCommentList = async () => {
      try {
        const response = await api(`/api/comments/${id}`,{
          cancelToken: source.token,
        });
        const data = await response.data;
        setComments(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("caught cancel axios");
        } else {
          console.log(error);
        }
      }
    
    };
    fetchCommentList();
    return () => {
      source.cancel();

    };
  }, []);
  return (
    <>
      <h3 style={{ color: "#FF69B4" }}>{name}</h3>
      <code>{info}</code> <br />
      <code>作者:{author}</code> <br />
      <code>类型:{tags.map((tag) => tag + ";")}</code> <br />
      <code>日期:{createdDate}</code> <br />
      <code>{code ? code : null}</code>
      <br />
      <div id={id} style={{ overflowX: "auto" }}></div>
      <div
        className="btn btn-sm bg-light text-dark"
        onClick={() => setTriggerComment(!triggerComment)}
      >
       
        
          <i className="fas fa-angle-down"></i>
        
        评论{`(${comments.length})`}
      </div>
      {triggerComment && (
        <Comment comments={comments} _id={id} currentUser={currentUser} />
      )}
    </>
  );
};

export default PrivatePostItem;

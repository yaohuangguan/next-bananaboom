import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import api from "../../../utils/Api";
const Comment = ({ currentUser, comments, _id }) => {
  const [commentInputField, setinputField] = useState("");
  const [commentsCount, setcommentsCount] = useState(comments.length);
  const [errors, seterrors] = useState("");
  const [commentsList, setcommentsList] = useState(comments);
  const handleCommentChange = e => setinputField(e.target.value);
  useEffect(() => {
    const abort = new AbortController();
    const signal = abort.signal;
    const getNewComments = async () => {
      const response = await api.get(`/api/comments/${_id}`, {
        signal: signal
      });
      let getComments = await response.data;
      setcommentsList(getComments);
      setcommentsCount(getComments.length);
    };
    getNewComments();
    return () => {
      abort.abort();
    };
  }, []);
  const clearCommentField = () => {
    const textarea = document.querySelector(".md-textarea");
    textarea.value = "";
    setinputField("");
  };
  const getNewComments = async () => {
    const response = await api.get(`/api/comments/${_id}`);
    let getComments = await response.data;
    setcommentsList(getComments);
    setcommentsCount(getComments.length);
  };
  const submitComment = async () => {
    if (!currentUser) {
      return seterrors("Please login to comment");
    }
    if (commentInputField.trim() == "") {
      return seterrors("comment can not be empty");
    }
    if (commentInputField.trim().length > 120) {
      return seterrors("You can't post a comment more than 120 words");
    }
    const { displayName, photoURL } = currentUser;
    try {
      const response = await api({
        method: "post",
        url: `/api/comments/${_id}`,
        data: JSON.stringify({
          user: displayName,
          photoURL,
          comment: commentInputField
        })
      });
      const result = await response.data;
      console.log(result);
      getNewComments();
      seterrors("");
      clearCommentField();
    } catch (error) {
      seterrors(error);
      clearCommentField();
    }
  };

  // const addReply = async (id) =>{
  //   try {
  //     const response = await api({
  //       method:'post',
  //       url:`/api/comments/reply/${id}`,
  //       data:
  //     })
  //   } catch (error) {

  //   }
  // }
  // const collectReply = (replyValue) =>{

  // }

  return (
    <div className="chat-room">
      <div className="comment-title mb-4">
        <h6 className="font-weight-bold">评论({commentsCount})</h6>
      </div>
      {commentsList.length == 0 ? "快来做第一个评论的人吧!" : null}
      <div className="px-2">
        <div className="chat-message w-100">
          <ul className="list-unstyled chat">
            <CommentList comments={commentsList} currentUser={currentUser} article_id={_id}></CommentList>
            <div className="textarea-whole">
              <h5>发布评论</h5>
              <p className='text-muted'>需要登录后才能留言</p>
              <div className="form-group basic-textarea">
                {errors ? (
                  <div className="errors text-danger">{errors}</div>
                ) : null}
                <div className="md-form m-0">
                  <textarea
                    className="form-control pl-2 my-0 md-textarea"
                    rows="2"
                    id="textarea-char-counter"
                    length="120"
                    value={commentInputField}
                    onChange={handleCommentChange}
                  ></textarea>
                  <label htmlFor="textarea-char-counter">说点儿什么呗</label>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-hover color-5 mb-3 waves-effect waves-light float-right"
              onClick={submitComment}
            >
              Send
            </button>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .textarea {
          box-shadow: none;
        }
        .textarea:focus {
          border: none;
          outline: none;
          border: 1px solid #2eca6a;
          border-color: #2eca6a;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Comment;

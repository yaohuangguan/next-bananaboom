import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";

const MyEditor = ({ currentUser, comments, _id }) => {
  const [commentInputField, setinputField] = useState("");
  const [errors, seterrors] = useState("");
  const [commentsList, setcommentsList] = useState(comments);
  const handleCommentChange = e => setinputField(e.target.value);
  const clearCommentField = () => {
    const textarea = document.querySelector(".textarea");
    textarea.value = "";
    setinputField("");
  };
  const getNewComments = async () => {
    const response = await fetch(`http://localhost:5000/api/comments/${_id}`);
    let getComments = await response.json();
    setcommentsList(getComments[0].comments);
  };
  const submitComment = async () => {
    if (!currentUser) {
      seterrors("Please login to comment");
      return console.log("Please login");
    }
    if (commentInputField.trim() == "") {
      seterrors("comment can not be empty");
      return console.log("comment can not be empty");
    }
    const { displayName, photoURL } = currentUser;
    try {
      const response = await fetch(
        `http://localhost:5000/api/comments/${_id}`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: displayName,
            photoUrl: photoURL,
            comment: commentInputField
          })
        }
      );
      const result = await response.json();

      getNewComments();
      seterrors('');
      clearCommentField();
    } catch (error) {
      seterrors(error);
      clearCommentField();
    }
  };

  return (
    <div className="chat-room">
      <div className="comment-title mb-4">
        <h6 className="font-weight-bold">评论({comments.length})</h6>
      </div>
      {commentsList.length == 0 ? "快来做第一个评论的人吧!" : null}
      <div className="px-2">
        <div className="chat-message w-100">
          <ul className="list-unstyled chat">
            <CommentList comments={commentsList} article_id={_id}></CommentList>
            <div className="textarea-whole">
              <h5>发布评论</h5>
              <div className="form-group basic-textarea">
                {errors ? (
                  <div className="errors text-danger">{errors}</div>
                ) : null}
                <textarea
                  className="form-control pl-2 my-0 textarea"
                  id="exampleFormControlTextarea2"
                  rows="3"
                  value={commentInputField}
                  onChange={handleCommentChange}
                  placeholder="说点儿什么呗"
                ></textarea>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-hover color-5 waves-effect waves-light float-right"
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

export default MyEditor;

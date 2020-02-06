import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import api from "../../../utils/Api";
import axios from "axios";
import Signup from '../../Auth/Signup'
const Comment = ({ currentUser, comments, _id }) => {
  const [commentInputField, setcommentInputField] = useState("");
  const [commentsCount, setcommentsCount] = useState(comments.length);
  const [errors, seterrors] = useState("");
  const [commentsList, setcommentsList] = useState(comments);
  const [emojiList, setemojiList] = useState('')
  const handleCommentChange = async e => {
    setcommentInputField(e.target.value);
    const emoji = await fetch(`https://emoji.getdango.com/api/emoji?q=${commentInputField}`)
    const data = await emoji.json()
    setemojiList(data.results)
  }
  
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const getNewComments = async () => {
      const response = await api.get(`/api/comments/${_id}`, {
        cancelToken: source.token
      });
      let getComments = await response.data;
      setcommentsList(getComments);
      setcommentsCount(getComments.length);
    };
    getNewComments();
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, []);
  const clearCommentField = () => {
    const textarea = document.querySelector(".comment-input");
    textarea.value = "";
    setcommentInputField("");
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
const appendToComment = (e) =>{
  setcommentInputField(commentInputField+e.target.textContent)
}
const getEmojiList = () =>{
  return (
    <div className='d-flex text-center' style={{overflow:'scroll'}}>
    {emojiList.map((each,index) => (
      <button key={index} className='mx-2' style={{width:'15%',borderRadius:'50px'}}  id={`${index}`}>
        <span style={{fontSize:'20px'}} onClick={appendToComment}>{each.text}</span>
      </button>
    ))}
  </div>
  )
}
  return (
    <div className="chat-room">
      <div className="comment-title mb-4">
        <h6 className="font-weight-bold">评论({commentsCount})</h6>
        {commentsList.length == 0 ? "快来做第一个评论的人吧!" : null}

      </div>
      <div className=" mt-2">
        <div className="chat-message w-100">
          <ul className="list-unstyled chat">
            <CommentList
              comments={commentsList}
              currentUser={currentUser}
              article_id={_id}
            ></CommentList>
            <div className="textarea-whole">
              <h5>发布评论</h5>
              {currentUser ? null : (
                <div className="text-muted">需要登录后才能留言 <a><Signup linkColor={'text-primary'}></Signup></a></div>
               
              )}
              
              <div className="form-group basic-textarea">
                {errors ? (
                  <div className="errors text-danger">{errors}</div>
                ) : null}
                <div className="m-0">
                <div className='w-100'>
                  {emojiList ? (getEmojiList()) : null}
                </div>
                  <textarea
                    className="form-control my-0 comment-input text-center"
                    rows={3}
                    id="textarea-char-counter"
                    length="120"
                    value={commentInputField}
                    onChange={handleCommentChange}
                  ></textarea>
                  <label htmlFor="textarea-char-counter"></label>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-hover color-5 mb-3 waves-effect waves-light float-right"
              onClick={submitComment}
            >
              发送
            </button>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .comment-input{
          box-shadow: none;
          border: 2px solid #333;
          border-radius:30px
        }
        .comment-input:focus {
          border: none;
          outline: none;
          border: 2px solid #2eca6a;
          border-color: #2eca6a;
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Comment;

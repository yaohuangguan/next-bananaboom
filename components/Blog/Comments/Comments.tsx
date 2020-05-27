import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import {
  getNewComments,
  postNewComments,
  getEmojiList,
} from "../../../service";
import axios from "axios";
import Signup from "../../Auth/Signup";
import Loader from "../../Loader/Loader";
import { insertTextAtCursor } from "../../../utils/Utils";
const Comment = ({
  currentUser,
  comments,
  _id,
}: {
  currentUser: any;
  comments: any[];
  _id: string;
}) => {
  const [commentInputField, setcommentInputField] = useState("");
  const [commentsCount, setcommentsCount] = useState(comments.length);
  const [errors, seterrors] = useState("");
  const [commentsList, setcommentsList] = useState(comments);
  const [emojiList, setemojiList] = useState([]);
  const [loading, setloading] = useState(false);
  const fetchEmoji = async (e: any) => {
    const data = await getEmojiList(e);
    setemojiList(data.results);
  };
  const handleCommentChange = async (e: any) => {
    if (!e) {
      let box: any = document.getElementById("textarea-char-counter");
      return setcommentInputField(box.value);
    }
    setcommentInputField(e.target.value);
    fetchEmoji(e.target.value);
  };

  useEffect(() => {
    let source = axios.CancelToken.source();
    const getNewComment = async () => {
      try {
        const data = await getNewComments(_id);
        setcommentsList(data);
        setcommentsCount(data.length);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("caught cancel axios");
        } else {
          seterrors(error);
        }
      }
    };
    getNewComment();
    return () => {
      console.log("unmounting");
      source.cancel();
    };
  }, []);
  const clearCommentField = () => {
    const textarea: any = document.querySelector(".comment-input");
    textarea.value = "";
    setcommentInputField("");
  };

  const submitComment = async () => {
    if (!currentUser) {
      return seterrors("登录后才可评论。 Please login to comment");
    }
    if (commentInputField.trim() == "") {
      return seterrors("评论不能为空。 Comment can not be empty");
    }
    if (commentInputField.trim().length > 120) {
      return seterrors(
        "最大字符限制：120字。 You can't post a comment more than 120 words"
      );
    }
    const { displayName, photoURL } = currentUser;

    try {
      if (!loading) {
        setloading(true);
        const result = await postNewComments(
          _id,
          currentUser,
          {
            user: displayName,
            photoURL,
            comment: commentInputField,
          },
          {
            "x-google-auth": currentUser.ma ? currentUser.ma : null,
          }
        );
        setcommentsList(result);
        setcommentsCount(result.length);
        seterrors("");
        clearCommentField();
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      seterrors("出错了，请重新试试。 Something went wrong please try again!");

      clearCommentField();
    }
  };

  const appendToComment = (e: any) => {
    let box = document.getElementById("textarea-char-counter");
    const content = e.target.firstChild.textContent;
    insertTextAtCursor(box, content);
    //@ts-ignore
    handleCommentChange();
  };
  const displayEmojiList = () => {
    return (
      <div className="text-center emoji-list">
        {emojiList.map((each: any, index: number) => (
          <button
            key={index}
            className="mx-2"
            style={{
              width: "15%",
              borderRadius: "50px",
              backgroundColor: "transparent",
              borderColor: "#333333",
              outline: "none",
              textAlign: "center",
            }}
            id={`${index}`}
            onClick={appendToComment}
          >
            <span style={{ fontSize: "20px" }}>{each.text}</span>
          </button>
        ))}
      </div>
    );
  };
  return (
    <div className="chat-room">
      <div className="comment-title mb-4">
        <h6 className="font-weight-bold">评论({commentsCount})</h6>
        {commentsList.length == 0 ? "快来做第一个评论的人吧!" : null}
      </div>
      <div className=" mt-2">
        <div className="chat-message w-100">
          <ul className="list-unstyled chat">
            {loading ? (
              <Loader />
            ) : (
              <CommentList
                comments={commentsList}
                currentUser={currentUser}
                article_id={_id}
              />
            )}
            <div className="textarea-whole">
              <h5>发布评论</h5>
              {currentUser ? null : (
                <div className="text-muted">
                  需要登录后才能留言{" "}
                  <div>
                    <Signup linkColor={"text-primary"}></Signup>
                  </div>
                </div>
              )}

              <div className="form-group basic-textarea">
                {errors ? (
                  <div className="errors text-danger">{errors}</div>
                ) : null}
                <div className="m-0">
                  {emojiList ? displayEmojiList() : null}

                  <textarea
                    className="form-control my-0 comment-input"
                    rows={3}
                    id="textarea-char-counter"
                    value={commentInputField}
                    onChange={handleCommentChange}
                  ></textarea>
                  <label htmlFor="textarea-char-counter"></label>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn bg-dark text-white waves-effect waves-light float-right"
              style={{ marginTop: "-20px" }}
              onClick={submitComment}
            >
              {!loading ? "发送" : <Loader size="20px" />}
            </button>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .comment-input {
          box-shadow: none;
          border: 2px solid #333;
          border-radius: 10px;
        }
        .comment-input:focus {
          border: none;
          outline: none;
          border: 2px solid #aa66cc;
          border-color: #aa66cc;
          box-shadow: none;
        }
        .emoji-list {
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default Comment;

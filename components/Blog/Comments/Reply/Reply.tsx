import ReplyList from "./ReplyList";
import {getEmojiList,getCommentReply,postCommentReply} from '../../../../service'
import axios from "axios";
import Loader from "../../../Loader/Loader";
import { useState, useEffect } from "react";

const Reply = ({ reply, comment_id, user_id, currentUser }: any) => {
  const [replyContent, setreplyContent] = useState("");
  const [replyList, setreplyList] = useState(reply);
  const [errors, seterrors] = useState("");
  const [emojiList, setemojiList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEmoji = async (e) => {
    // const data = await getEmojiList(e);
    // setemojiList(data.results.slice(0, 5));
  };
  const handleReplyChange = async (e) => {
    setreplyContent(e.target.value);
    fetchEmoji(e.target.value);
  };
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getNewReply = async () => {
      try {
        const response = await getCommentReply(comment_id);
        const newReply = await response[0].reply;
        setreplyList(newReply);
        const data = await getEmojiList('happy')
        setemojiList(data.results.slice(0, 5));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("caught cancel");
        }
      }
    };
    getNewReply();
    return () => {
      source.cancel();
    };
  }, []);
  const showReply = () => {
    const reply = document.getElementById(comment_id);
    if (reply) {
      reply.classList.toggle("d-none");
    }
  };

  const cleanReply = () => {
    let reply: any = document.querySelector(".reply-field");
    reply.value = "";
    setreplyContent("");
  };
  const addReply = async () => {
    try {
      if (!currentUser)
        return seterrors("登录后才能回复评论。 Please Login to reply.");
      if (replyContent.trim() == "") {
        return seterrors("回复不能为空。 Reply Cannot be empty.");
      }
      if (replyContent.trim().length > 120) {
        return seterrors(
          "最大字符限制：120字  You can't post a comment more than 120 words"
        );
      }
      const { displayName, photoURL } = currentUser;
      if (!loading) {
        setLoading(true);
        const response = await postCommentReply(comment_id,{
          user: displayName,
          photoURL,
          reply: replyContent,
        });

        const result = await response[0].reply;
        setreplyList(result);
        cleanReply();
        showReply();
        setLoading(false);
        seterrors("");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      seterrors("Something wrong please try again!");
      cleanReply();
      showReply();
    }
  };
  // const getNewReply = async comment_id => {
  //   const newReply = await api.get(`/api/comments/reply/${comment_id}`);
  //   const data = await newReply.data[0].reply;
  //   return data;
  // };
  const handleNewReply = (newReply: any) => {
    setreplyList(newReply);
  };
  const handleError = (error) => {
    seterrors(error);
  };
  const appendToComment = (e: any) => {
    const content = e.target.firstChild.textContent;
    setreplyContent(replyContent + content);
  };
  const displayEmojiList = () => {
    return (
      <div className="text-center emoji-list">
        {emojiList.map((each: any, index: number) => (
          <button
            key={index}
            style={{
              width: "15%",
              margin: "3px",
              borderRadius: "20px",
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
    <div className="reply-section row form-group">
      {errors ? <div className="errors text-danger">{errors}</div> : null}
      <div
        className="col-lg-12"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {replyList.length === 0 ? null : (
          <div style={{ justifySelf: "flex-start", width: "90%" }}>
            <ReplyList
              reply={replyList}
              showReply={showReply}
              comment_id={comment_id}
              user_id={user_id}
              currentUser={currentUser}
              handleNewReply={handleNewReply}
              handleError={handleError}
            ></ReplyList>
          </div>
        )}
        <div style={{ justifySelf: "flex-end" }}>
          <a onClick={showReply} className="text-primary">
          <i className="fas fa-angle-down"></i>
            回复
          </a>

          <a>({replyList.length})</a>
        </div>
      </div>

      <div className="d-none m-0 reply col-md-6" id={comment_id}>
        {emojiList ? displayEmojiList() : null}

        <div className="reply-wrapper">
          <input
            type="text"
            className="form-control reply-field"
            placeholder={`Reply...`}
            onChange={handleReplyChange}
            value={replyContent}
          />
          <button
            type="submit"
            className="text-white reply-button"
            onClick={addReply}
          >
            {!loading ? "发送" : <Loader />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .reply-wrapper {
          position: relative;
        }
        .reply-field {
          box-shadow: none;
          border: 2px solid #333;
          border-radius: 30px 0px 0px 30px;
          width: 92%;
          height: 40px;
        }
        .reply-field:focus {
          border: none;
          outline: none;
          border: 2px solid #2eca6a;
          border-color: #2eca6a;
          box-shadow: none;
        }
        .reply-field:focus + .reply-button {
          border: 1px solid #2eca6a;
          background-color: #2eca6a;
        }
        .reply-button {
          position: absolute;
          height: 40px;
          background-color: #333333;
          transition: background-color 0.3s ease, border 0.3s ease;
          top: 0;
          right: 0px;
          padding: 7px;
          border-radius: 0px 50px 50px 0px;
          border: 1px solid #333;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Reply;

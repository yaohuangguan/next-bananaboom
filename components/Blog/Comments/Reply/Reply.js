import ReplyList from "./ReplyList";
import api from "../../../../utils/Api";
import axios from "axios";
import Loader from "../../../Loader/Loader";
import { useState, useEffect } from "react";

const Reply = ({ reply, comment_id, user_id, currentUser }) => {
  const [replyContent, setreplyContent] = useState("");
  const [replyList, setreplyList] = useState(reply);
  const [errors, seterrors] = useState("");
  const [emojiList, setemojiList] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchEmoji = async () => {
    const emoji = await fetch(
      `https://emoji.getdango.com/api/emoji?q=${replyContent}`
    );
    const data = await emoji.json();
    setemojiList(data.results.slice(0, 5));
  };
  const handleReplyChange = async e => {
    setreplyContent(e.target.value);
    fetchEmoji();
  };
  useEffect(() => {
    let source = axios.CancelToken.source();
    const getNewReply = async () => {
      try {
        const response = await api.get(`/api/comments/reply/${comment_id}`, {
          cancelToken: source.token
        });
        const newReply = await response.data[0].reply;
        setreplyList(newReply);
        const emoji = await axios.get(
          `https://emoji.getdango.com/api/emoji?q=$happy`,
          {
            cancelToken: source.token
          }
        );
        const data = await emoji.data;
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
  const showReply = e => {
    const reply = document.getElementById(comment_id);
    if (reply) {
      reply.classList.toggle("d-none");
    }
  };

  const cleanReply = () => {
    let reply = document.querySelector(".reply-field");
    reply.value = "";
    setreplyContent("");
  };
  const addReply = async () => {
    try {
      if (!currentUser) return seterrors("Login to reply");
      if (replyContent.trim() == "") {
        return seterrors("reply can not be empty");
      }
      if (replyContent.trim().length > 120) {
        return seterrors("You can't post a comment more than 120 words");
      }
      const { displayName, photoURL } = currentUser;
      if (!loading) {
        setLoading(true);
        const response = await api({
          method: "post",
          url: `/api/comments/reply/${comment_id}`,
          data: JSON.stringify({
            user: displayName,
            photoURL,
            reply: replyContent
          })
        });

        const result = await response.data[0].reply;
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
  const handleNewReply = newReply => {
    setreplyList(newReply);
  };
  const handleError = error => {
    seterrors(error);
  };
  const appendToComment = e => {
    const content = e.target.firstChild.textContent;
    setreplyContent(replyContent + content);
  };
  const getEmojiList = () => {
    return (
      <div className="text-center emoji-list">
        {emojiList.map((each, index) => (
          <button
            key={index}
            style={{
              width: "15%",
              margin: "3px",
              borderRadius: "20px",
              backgroundColor: "transparent",
              borderColor: "#333333",
              outline: "none",
              textAlign: "center"
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
          <div style={{ justifySelf: "flex-start" }}>
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
            回复
          </a>

          <a>({replyList.length})</a>
        </div>
      </div>

      <div className="d-none m-0 reply col-md-6" id={comment_id}>
        {emojiList ? getEmojiList() : null}

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
            className="btn-sm text-white reply-button"
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
          border-radius: 30px;
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

import ReplyList from "./ReplyList";
import api from "../../../../utils/Api";
import axios from "axios";
import { useState, useEffect } from "react";
const Reply = ({ reply, id, currentUser }) => {
  const [replyContent, setreplyContent] = useState("");
  const [replyList, setreplyList] = useState(reply);
  const [errors, seterrors] = useState("");
  const [emojiList, setemojiList] = useState("");
  const handleReplyChange = async e => {
    setreplyContent(e.target.value);
    const emoji = await fetch(
      `https://emoji.getdango.com/api/emoji?q=${replyContent}`
    );
    const data = await emoji.json();
    setemojiList(data.results);
  };
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getNewReply = async () => {
      const newReply = await (
        await api.get(`/api/comments/reply/${id}`, {
          cancelToken: source.token
        })
      ).data[0].reply;
      setreplyList(newReply);
    };
    getNewReply();
    return () => {
      source.cancel("cancel");
    };
  }, []);
  const showReply = e => {
    const reply = document.getElementById(id);
    reply.classList.toggle("d-none");
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
      const response = await api({
        method: "post",
        url: `/api/comments/reply/${id}`,
        data: JSON.stringify({
          user: displayName,
          photoURL,
          reply: replyContent
        })
      });
      await response.data;
      const newReply = await (await api.get(`/api/comments/reply/${id}`))
        .data[0].reply;
      setreplyList(newReply);
      cleanReply();
    } catch (error) {
      console.log(error);
      cleanReply();
    }
  };
  const appendToComment = e => {
    setreplyContent(replyContent + e.target.textContent);
  };
  const getEmojiList = () => {
    return (
      <div className="d-flex text-center">
        {emojiList.map((each, index) => (
          <button
            key={index}
            className="mx-2"
            style={{ width: "50px", borderRadius: "50px" }}
            id={`${index}`}
          >
            <span style={{ fontSize: "20px" }} onClick={appendToComment}>
              {each.text}
            </span>
          </button>
        ))}
      </div>
    );
  };
  return (
    <div className="reply-section">
      {errors ? <div className="errors text-danger">{errors}</div> : null}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <a
          onClick={showReply}
          className="text-primary"
          style={{ alignSelf: "flex-end" }}
        >
          Reply
        </a>
        <div>
          <a>
            <img src="https://img.icons8.com/cotton/30/000000/comments--v2.png" />
            {replyList.length}
          </a>
        </div>
      </div>

      <div className="w-100 md-form m-0 d-none reply position-relative" id={id}>
        {emojiList ? getEmojiList() : null}

        <input
          type="text"
          className="form-control reply-field"
          placeholder="Enter your public reply here..."
          onChange={handleReplyChange}
          value={replyContent}
        />
        <button
          type="submit"
          className="btn-hover color-4 position-absolute"
          style={{ top: 0, right: "1%" }}
          onClick={addReply}
        >
          Reply
        </button>
      </div>
      {replyList.length === 0 ? null : (
        <ReplyList reply={replyList} showReply={showReply}></ReplyList>
      )}
    </div>
  );
};

export default Reply;

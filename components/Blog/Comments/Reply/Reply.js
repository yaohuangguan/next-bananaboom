import ReplyList from "./ReplyList";
import api from "../../../../utils/Api";
import { useState, useEffect } from "react";
const Reply = ({ reply, id, currentUser }) => {
  const [replyContent, setreplyContent] = useState("");
  const [replyList, setreplyList] = useState(reply);
  useEffect(() => {
    let abort = new AbortController();
    let signal = abort.signal;
    const getNewReply = async () => {
      const newReply = await (
        await api.get(`/api/comments/reply/${id}`, { signal })
      ).data[0].reply;
      setreplyList(newReply);
    };
    getNewReply();
    return () => {
      abort.abort();
    };
  }, []);
  const showReply = e => {
    const reply = document.getElementById(id);
    reply.classList.toggle("d-none");
  };
  const handleReplyChange = e => {
    setreplyContent(e.target.value);
    console.log(e.target.value);
  };

  const addReply = async () => {
    try {
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
      const newReply = await (await api.get(`/api/comments/reply/${id}`)).data[0].reply;
      setreplyList(newReply);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="reply-section">
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
            <img src="https://img.icons8.com/windows/24/000000/comments.png"></img>
            {replyList.length}
          </a>
        </div>
      </div>
      <div className="w-100 md-form m-0 d-none reply position-relative" id={id}>
        <input
          type="text"
          className="form-control"
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

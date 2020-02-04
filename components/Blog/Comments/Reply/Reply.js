import ReplyList from "./ReplyList";
import api from "../../../../utils/Api";
import axios from 'axios'
import { useState, useEffect } from "react";
const Reply = ({ reply, id, currentUser }) => {
  const [replyContent, setreplyContent] = useState("");
  const [replyList, setreplyList] = useState(reply);
  const [errors, seterrors] = useState('')
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const getNewReply = async () => {
      const newReply = await (
        await api.get(`/api/comments/reply/${id}`, { cancelToken: source.token })
      ).data[0].reply;
      setreplyList(newReply);
    };
    getNewReply();
    return () => {
      source.cancel('cancel')
    };
  }, []);
  const showReply = e => {
    const reply = document.getElementById(id);
    reply.classList.toggle("d-none");
  };
  const handleReplyChange = e => {
    setreplyContent(e.target.value);
  };
  const cleanReply = () =>{
    let reply = document.querySelector('.reply-field')
    reply.value = ''
    setreplyContent('')
  }
  const addReply = async () => {
    try {
      if(!currentUser) return seterrors('Login to reply')
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
      const newReply = await (await api.get(`/api/comments/reply/${id}`)).data[0].reply;
      setreplyList(newReply);
      setreplyContent('')
    } catch (error) {
      console.log(error);
      setreplyContent('')

    }
  };
  return (
    <div className="reply-section">
     {errors ? (
                  <div className="errors text-danger">{errors}</div>
                ) : null}
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

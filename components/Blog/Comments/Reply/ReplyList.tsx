import ReplyListItem from "./ReplyListItem";
import { useState } from "react";
import api from "../../../../utils/Api";
const ReplyList = ({ reply, showReply, comment_id, currentUser,handleNewReply,getNewReply}) => {
  const [replyContent, setreplyContent] = useState("");
  const [targetUser, settargetUser] = useState('')
  const handleReplyChange = e => {
    setreplyContent(e.target.value);
  };
  const handleTargetUser = (user) => {
    settargetUser(user)
  }
  const makeReplyReq = async () => {
    const { photoURL,displayName } = currentUser;
    if (replyContent.trim() === "" || !replyContent) return;
    try {
      if(targetUser === displayName) return;
      const response = await api.post(`/api/comments/reply/${comment_id}`, {
        reply: replyContent,
        targetUser,
        photoURL,
        user:displayName
      });
      const newReply = await api.get(`/api/comments/reply/${comment_id}`)
      const data = await newReply.data[0].reply;
      handleNewReply(data)
      setreplyContent('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {reply &&
        reply.map(({ id, ...otherProps }) => {
          return (
            <ReplyListItem
              id={id}
              key={id}
              {...otherProps}
              comment_id={comment_id}
              showReply={showReply}
              replyContent={replyContent}
              handleReplyChange={handleReplyChange}
              handleTargetUser={handleTargetUser}
              makeReplyReq={makeReplyReq}
            ></ReplyListItem>
          );
        })}
    </div>
  );
};

export default ReplyList;

import ReplyListItem from "./ReplyListItem";
import { useState } from "react";
import api from "../../../../utils/Api";
const ReplyList = ({
  reply,
  user_id,
  showReply,
  comment_id,
  currentUser,
  handleNewReply,
  handleError
}) => {
  const [replyContent, setreplyContent] = useState("");
  const [targetUser, settargetUser] = useState("");
  const [loading, setLoading] = useState(false);
  const handleReplyChange = e => {
    setreplyContent(e.target.value);
  };
  const handleTargetUser = user => {
    settargetUser(user);
  };
  const makeReplyReq = async () => {
    if(!currentUser) return handleError("需要登录后才可回复。 You need to login to reply");
    const { photoURL, displayName, _id } = currentUser;

    if (replyContent.trim() === "" || !replyContent)
      return handleError("回复不能为空。 Reply Cannot be empty");
    try {
      if (targetUser === displayName)
        return handleError("你不能回复自己。 Sorry, You cannot reply to yourself");
      if (user_id === _id) return handleError("你不能回复自己。 Sorry, You cannot reply to yourself");
      if (!loading) {
        setLoading(true);
        const response = await api.post(`/api/comments/reply/${comment_id}`, {
          reply: replyContent,
          targetUser,
          photoURL,
          user: displayName
        });

        const data = await response.data[0].reply;
        handleNewReply(data);
        setreplyContent("");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {reply &&
        reply.map(({ id, ...otherProps }) => {
          return (
            <ReplyListItem
              id={id}
              key={id}
              {...otherProps}
              loading={loading}
              replyContent={replyContent}
              handleReplyChange={handleReplyChange}
              handleTargetUser={handleTargetUser}
              makeReplyReq={makeReplyReq}
            ></ReplyListItem>
          );
        })}
    </>
  );
};

export default ReplyList;

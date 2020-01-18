import ReplyListItem from "./ReplyListItem";
const ReplyList = ({ reply,showReply }) => {
  return (
    <div>
      {reply &&
        reply.map(({ id, ...otherProps }) => {
          return (
            <ReplyListItem id={id} key={id} {...otherProps} showReply={showReply}></ReplyListItem>
          );
        })}
    </div>
  );
};

export default ReplyList;

import React from "react";
import CommentListItem from "./CommentListItem";
const CommentList = ({ comments, currentUser }) => {
  return (
    <div>
      {comments.map(({ id, ...otherProps }) => {
        return (
          <CommentListItem key={id} id={id} currentUser={currentUser} {...otherProps}></CommentListItem>
        );
      })}
    </div>
  );
};

export default CommentList;

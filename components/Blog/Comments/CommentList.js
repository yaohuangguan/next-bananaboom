import React from "react";
import CommentListItem from "./CommentListItem";
const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map(({ id, ...otherProps }) => {
        return (
          <CommentListItem key={id} id={id} {...otherProps}></CommentListItem>
        );
      })}
    </div>
  );
};

export default CommentList;

import React from "react";
import CommentListItem from "./CommentListItem";
const CommentList = ({ comments, currentUser }) => {
  return (
    <div>
      {comments.map(({ _id,id, ...otherProps }) => {
        return (
          <CommentListItem key={_id} id={id} currentUser={currentUser} {...otherProps}></CommentListItem>
        );
      })}
    </div>
  );  
};

export default CommentList;

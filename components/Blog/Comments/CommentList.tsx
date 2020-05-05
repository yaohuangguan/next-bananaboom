import React from "react";
import CommentListItem from "./CommentListItem";
const CommentList = ({ comments, currentUser }:{
  comments:any[];
  currentUser:any;
  article_id?:string
}) => {
  return (
    <div>
      {comments.map(({ _id,id, ...otherProps }:any) => {
        return (
          <CommentListItem key={_id} id={id} currentUser={currentUser} {...otherProps}></CommentListItem>
        );
      })}
    </div>
  );  
};

export default CommentList;

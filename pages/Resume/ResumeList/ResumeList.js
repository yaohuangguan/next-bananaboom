import React from "react";
import ResumeListItem from "./ResumeListItem";
const ResumeList = ({ items }) => {
  return (
    <div className="row">
      {items.map(({ _id, ...other }) => (
        <ResumeListItem key={_id} _id={_id} {...other} />
      ))}
    </div>
  );
};

export default ResumeList;

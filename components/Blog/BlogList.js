import React from "react";
import BlogListItem from "./BlogListItem";
const BlogList = props => {
  const { blogs } = props;
  return (
    <div>
      {blogs.map(({ _id, ...other }) => (
        <BlogListItem key={_id} {...other} _id={_id} />
      ))}
    </div>
  );
};

export default BlogList;

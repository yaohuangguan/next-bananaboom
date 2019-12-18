import React from "react";
import BlogListItem from "./BlogListItem";
const BlogList = props => {
  const { blogs } = props;
  return (
    <div>
      {blogs.map(({ id, ...other }) => (
        <BlogListItem key={id} {...other} id={id} />
      ))}
    </div>
  );
};

export default BlogList;

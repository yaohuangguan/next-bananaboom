import React, { useEffect } from "react";
import PrivatePostItem from "./PrivatePostItem";
const PrivatePost = ({ posts }) => {

  useEffect(() => {
    const config = () => {
      if (Object.prototype.toString.call(posts) === "[object Object]") {
        posts = [].concat(posts);
      }
    };
    config();
    return () => {};
  }, []);

  return (
    <>
      {posts &&
        posts.map(({ _id, ...other }) => (
          <div key={_id}>
            <PrivatePostItem id={_id} {...other}></PrivatePostItem>
          </div>
        ))}
    </>
  );
};

export default PrivatePost;

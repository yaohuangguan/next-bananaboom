import React, { useEffect, useState } from "react";
import PrivatePostItem from "./PrivatePostItem";
import api from "../../../utils/Api";
const PrivatePost = ({ privatePosts }) => {
  useEffect(() => {
    const config = () => {
      if (Object.prototype.toString.call(privatePosts) === "[object Object]") {
        privatePosts = [].concat(privatePosts);
      }
    };
    config();
    return () => {};
  }, []);

  return (
    <div className="private-post-list">
      {privatePosts
        ? privatePosts.map(({ _id, ...other }) => (
            <div
              key={_id}
              style={{
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: "40px",
                borderRadius: "50px",
                marginBottom: "20px"
              }}
            >
              <PrivatePostItem id={_id} {...other}></PrivatePostItem>
            </div>
          ))
        : null}
    </div>
  );
};

export default PrivatePost;

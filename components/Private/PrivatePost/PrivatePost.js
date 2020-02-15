import React, { useEffect, useState } from "react";
import PrivatePostItem from "./PrivatePostItem";
import api from "../../../utils/Api";
import axios from 'axios'
const PrivatePost = () => {
  const [privatePosts, setprivatePosts] = useState("");
  useEffect(() => {
    const config = () => {
      if (Object.prototype.toString.call(privatePosts) === "[object Object]") {
        privatePosts = [].concat(privatePosts);
      }
    };
    config();
    return () => {};
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source()
    const getNewPrivatePosts = async () => {
      try {
        const response = await api("/api/posts/private/posts", {
          cancelToken: source.token
        });
        let data = await response.data;
        console.log(data);
        setprivatePosts(data);
      } catch (error) {
        console.log(error)
      }
      
    };
    getNewPrivatePosts();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <>
      {privatePosts
        ? privatePosts.map(({ _id, ...other }) => (
            <div key={_id}>
              <PrivatePostItem id={_id} {...other}></PrivatePostItem>
            </div>
          ))
        : null}
    </>
  );
};

export default PrivatePost;

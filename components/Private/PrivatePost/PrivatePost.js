import React, { useEffect, useState } from "react";
import PrivatePostItem from "./PrivatePostItem";
import api from "../../../utils/Api";
import axios from "axios";
import Loader from "../../Loader/Loader";
const PrivatePost = () => {
  const [privatePosts, setprivatePosts] = useState("");
  const [loading, setloading] = useState(false);
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
    setloading(true);
    const source = axios.CancelToken.source();
    const getNewPrivatePosts = async () => {
      try {
        const response = await api("/api/posts/private/posts", {
          cancelToken: source.token
        });
        let data = await response.data;
        console.log(data);
        setloading(false);
        setprivatePosts(data);
      } catch (error) {
        setloading(false);
        console.log(error);
      }
    };
    getNewPrivatePosts();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <>
      {!loading ? (
        privatePosts ? (
          privatePosts.map(({ _id, ...other }) => (
            <div key={_id}>
              <PrivatePostItem id={_id} {...other}></PrivatePostItem>
            </div>
          ))
        ) : null
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default PrivatePost;

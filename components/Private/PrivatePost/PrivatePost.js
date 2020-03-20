import React, { useEffect, useState } from "react";
import PrivatePostItem from "./PrivatePostItem";
import api from "../../../utils/Api";
import axios from "axios";
import Loader from "../../Loader/Loader";
import emitter from "../../../utils/EventEmitter";
const PrivatePost = () => {
  const [privatePosts, setprivatePosts] = useState("");
  const [loading, setloading] = useState(false);
  const getNewPrivatePosts = async () => {
    console.log("event trigger!");

    try {
      if (!loading) {
        setloading(true);
        const response = await api("/api/posts/private/posts");
        let data = await response.data;
        setprivatePosts(data);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      console.log("error");
    }
  };
  emitter.subscribe("getNewPrivatePosts", () => getNewPrivatePosts());

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
        if (axios.isCancel(error)) {
          console.log("caught cancel axios");
        } else {
          setloading(false);
        }
      }
    };
    getNewPrivatePosts();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className='w-100'>
      {!loading ? (
        privatePosts ? (
          privatePosts.map(({ _id, ...other }) => (
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
        ) : null
      ) : (
        <Loader color={"text-white"} size={"80px"}></Loader>
      )}
    </div>
  );
};

export default PrivatePost;

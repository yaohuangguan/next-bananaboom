import { useState, useEffect } from "react";
import api from "../../utils/Api";
import {useRouter} from "next/router";
import "../Blog/BlogListItem.scss";
const Likes = ({ likes, _id }) => {
  const [likeCount, setCount] = useState(likes);
  const [ifLiked, handleLike] = useState(false);
const router = useRouter()
  const cancelLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    const response = await api.put(`/api/homepage/likes/${_id}`);
    const newLikes = await api.get(`/api/homepage/likes`);
    const likesData = await newLikes.data;
    setCount(likesData[0].likes);
  };
  const addLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    const response = await api.post(`/api/homepage/likes/${_id}`);
    const newLikes = await api.get(`/api/homepage/likes`);
    const likesData = await newLikes.data;

    setCount(likesData[0].likes);
  };
  const likeMySite = () => router.pathname === "/" ? "Like my site" : "点赞网站"
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="font-weight-bold text-dark p-0"
    >
      <div
        className={`heart ${ifLiked ? "liked is_animating" : ""}`}
        onClick={ifLiked ? cancelLike : addLike}
        id={_id}
      >
        {likeCount}
      </div>
      <span className="mr-5">
       {likeMySite()}
      </span>
    </div>
  );
};

export default Likes;

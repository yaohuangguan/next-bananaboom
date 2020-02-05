import { useState, useEffect } from "react";
import api from "../../utils/Api";
import { useRouter } from "next/router";
import "../Blog/BlogListItem.scss";
const Likes = ({ likes, _id }) => {
  const [likeCount, setCount] = useState(likes);
  const [ifLiked, handleLike] = useState(false);
  const router = useRouter();
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
  const getLikeOnRoutes = () => router.pathname ==='/'? 'like this website' : '点赞本站'
  return (
    <div style={{ display: "flex",justifyContent:'center',alignItems:'center' }} className="font-weight-bold text-dark">
       <div>{getLikeOnRoutes()}</div>
      <div
        className={`heart ${ifLiked ? "liked is_animating" : ""}`}
        onClick={ifLiked ? cancelLike : addLike}
        id={_id}
      ></div>
      <div>{likeCount}</div>
     
    </div>
  );
};

export default Likes;

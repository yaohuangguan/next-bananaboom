import { useState, useEffect } from "react";
import api from "../../utils/Api";
import { useRouter } from "next/router";
import "../Footer/Footer.scss";
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
    let tooltip = document.getElementById(`like-button-tip`);
    tooltip.innerHTML =
      router.pathname === "/"
        ? "Thanks anyway!"
        : "还在继续努力！";
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
    let tooltip = document.getElementById(`like-button-tip`);
    tooltip.innerHTML =
      router.pathname === "/"
        ? "Thank you!"
        : "谢谢点赞！";
  };
  const getLikeOnRoutes = () =>
    router.pathname === "/" ? "Like this website" : "点赞本站";
  const cleanLikeText = () => {
    let tooltip = document.getElementById(`like-button-tip`);
    tooltip.innerHTML = getLikeOnRoutes();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      className="font-weight-bold text-dark"
    >
      <div className="like-button font-weight-bold d-flex" style={{alignItems:'center'}}>
        <div
          className={`heart ${ifLiked ? "liked is_animating" : ""}`}
          onClick={ifLiked ? cancelLike : addLike}
          onMouseOut={cleanLikeText}
          id={_id}
        >
          <span className="like-button-text position-absolute" style={{bottom:'90%'}}  id='like-button-tip'>
            {getLikeOnRoutes()}
          </span>
        </div>
        <span>{likeCount}</span>
      </div>
    </div>
  );
};

export default Likes;

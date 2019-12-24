import { useState, useEffect } from "react";
import "../Blog/BlogListItem.scss";
const Likes = () => {
  const [likeCount, setCount] = useState(likes);
  const [ifLiked, handleLike] = useState(false);

  const cancelLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    await fetch(`http://localhost:5000/api/posts/like/${_id}`, {
      method: "put"
    });
    const newLikes = await fetch(`http://localhost:5000/api/posts/like/${_id}`);
    const likes = await newLikes.json();
    setCount(likes.likes);
  };
  const addLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    localStorage.setItem("ifLiked", true);
    await fetch(`http://localhost:5000/api/posts/like/${_id}`, {
      method: "post"
    });
    const newLikes = await fetch(`http://localhost:5000/api/posts/like/${_id}`);
    const likes = await newLikes.json();
    setCount(likes.likes);
  };
  return (
    <div>
      <div
        className={`heart ${ifLiked ? "liked is_animating" : ""}`}
        onClick={ifLiked ? cancelLike : addLike}
        id={_id}
      >
        <span className="font-weight-bold">
          <em>{likeCount}</em>{" "}
        </span>
      </div>
    </div>
  );
};

export default Likes;

import { useState, useEffect } from "react";
import "../Blog/BlogListItem.scss";
const Likes = ({likes,_id}) => {
  const [likeCount, setCount] = useState(likes);
  const [ifLiked, handleLike] = useState(false);

  const cancelLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    await fetch(`http://localhost:5000/api/homepage/likes/${_id}`, {
      method: "put"
    });
    const newLikes = await fetch(`http://localhost:5000/api/homepage/likes`);
    const likesData = await newLikes.json();
    setCount(likesData[0].likes);
  };
  const addLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    await fetch(`http://localhost:5000/api/homepage/likes/${_id}`, {
      method: "post"
    });
    const newLikes = await fetch(`http://localhost:5000/api/homepage/likes`);
    const likesData = await newLikes.json();

    setCount(likesData[0].likes);
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
      <br/><br/><br/><br/>
    </div>
  );
};

export default Likes;

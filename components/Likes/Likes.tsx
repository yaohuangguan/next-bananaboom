import { useState } from "react";
import {likeHomepage} from '../../service'
import { useRouter } from "next/router";
import "../Footer/Footer.scss";
const Likes = ({ likes, _id }: { likes: number; _id: string }) => {
  const [likeCount, setCount] = useState(likes);
  const [ifLiked, handleLike] = useState(false);
  const router = useRouter();
  const likeAndUpdate = async (id: string, action: string) => {
    const heart = document.getElementById(`${id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    const response = await likeHomepage(id,action);

    handleLike(!ifLiked);
    return response;
  };
  const cancelLike = async () => {
    const likesData = await likeAndUpdate(_id, "remove");
    setCount(likesData[0].likes);
    let tooltip = document.getElementById(`like-button-tip`);
    tooltip.innerHTML =
      router.pathname === "/" ? "Thanks anyway!" : "还在继续努力！";
  };

  const addLike = async () => {
    const likesData = await likeAndUpdate(_id, "add");
    setCount(likesData[0].likes);
    let tooltip = document.getElementById(`like-button-tip`);
    tooltip.innerHTML = router.pathname === "/" ? "Thank you!" : "谢谢点赞！";
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
        alignItems: "center",
      }}
      className="font-weight-bold white-text"
    >
      <div
        className="like-button font-weight-bold d-flex"
        style={{ alignItems: "center" }}
      >
        <div
          className={`heart ${ifLiked ? "liked is_animating" : ""}`}
          onClick={ifLiked ? cancelLike : addLike}
          onMouseOut={cleanLikeText}
          id={_id}
        >
          <span
            className="like-button-text position-absolute"
            style={{ bottom: "90%" }}
            id="like-button-tip"
          >
            {getLikeOnRoutes()}
          </span>
        </div>
        <span>{likeCount}</span>
      </div>
    </div>
  );
};

export default Likes;

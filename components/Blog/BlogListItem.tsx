import Link from "next/link";
import "./BlogListItem.scss";
import api from "../../utils/Api";
import { copyText } from "../../utils/clip";
import { useState } from "react";
import { randomColor } from "../../utils/Utils";
const colors = [`blue`, `orange`, `cyan`, `indigo`, `green`];

const BlogListItem = ({
  name,
  info,
  author,
  likes,
  tags,
  button,
  createdDate,
  _id,
  image,
  url
}) => {
  const [likeCount, setCount] = useState(likes);
  const [ifLiked, handleLike] = useState(false);

  const cancelLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    const response = await api.put(`/api/posts/likes/${_id}`);
    const newLikes = await api.get(`/api/posts/likes/${_id}`);
    const likesData = await newLikes.data;
    setCount(likesData.likes);
  };
  const addLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);

    const response = await api.post(`/api/posts/likes/${_id}`);
    const newLikes = await api.get(`/api/posts/likes/${_id}`);
    const likesData = await newLikes.data;
    setCount(likesData.likes);
  };
  const handleCopyText = () => {
    let dummy = document.createElement("input");
    let url = `${window.location.origin}/blogs/article/${_id}`;
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    dummy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(dummy);

    let tooltip = document.getElementById(`share-button-tip-${_id}`);
    tooltip.innerHTML = "Thank you! URL Copied! You can send it to your friends"
  };
  const cleanCopyText = () =>{
    var tooltip = document.getElementById(`share-button-tip-${_id}`);
    tooltip.innerHTML = "Share with friends";
  }
  return (
    <>
      <div className="py-5 px-3" style={{ width: "100%" }}>
        <h3 className="mb-3">
          <span className='font-weight-bold'>{name}</span>
        </h3>
        <div className='mb-2' style={{ display: "flex",justifyContent:'flex-start',alignItems:'center' }}>
          {tags.map((tag, index) => (
            <a
              className={`lighten-2 ${randomColor(
                colors
              )} white-text mx-2 px-2 py-1`}
              style={{ height: "30px" }}
              key={index}
            >
              <span className='font-weight-bold'>{tag}</span>
            </a>
          ))}
        </div>
        <p className="dark-grey-text">{info}</p>
        {image
          ? image.map((each, index) => (
              <img
                src={each}
                key={index}
                alt="img"
                width="180px"
                height="180px"
              ></img>
            ))
          : null}

        <span>
          created by:
          <span>{author}</span>, {createdDate}
        </span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {url ? (
            <Link href={`${url}`} replace>
              <a className="btn draw-border-blue" style={{ height: "50px" }}>
                {button || "Read More"}
              </a>
            </Link>
          ) : (
            <Link
              href={`/blogs/article/[id]`}
              as={`/blogs/article/${_id}`}
              replace
            >
              <a className="btn draw-border-blue" style={{ height: "50px" }}>
                {button || "Read More"}
              </a>
            </Link>
          )}

          <div
            className="font-weight-bold"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="share-button" id={_id} onClick={handleCopyText} onMouseOut={cleanCopyText}>
              <span className="share-button-text" id={`share-button-tip-${_id}`}>
                Share with friends
              </span>
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/carbon-copy/30/000000/share.png"
              />
            </div>
            <div
              className={`m-2 heart ${ifLiked ? "liked is_animating" : ""}`}
              onClick={ifLiked ? cancelLike : addLike}
              id={_id}
            >
              <em>{likeCount}</em>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListItem;

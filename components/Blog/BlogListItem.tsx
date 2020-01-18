import Link from "next/link";
import "./BlogListItem.scss";
import api from '../../utils/Api'
import { useEffect, useState } from "react";
import { randomColor } from '../../utils/Utils'
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
    const likesData = await newLikes.data
    setCount(likesData.likes);
  };
  const addLike = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);

    const response = await api.post(`/api/posts/likes/${_id}`);
    const newLikes = await api.get(`/api/posts/likes/${_id}`);
    const likesData = await newLikes.data
    setCount(likesData.likes);
  };

  return (
    <>
      <div className="py-5 px-3" style={{ width: "100%" }}>
        <h3 className="mb-3">
          <strong>{name}</strong>
        </h3>
        <div style={{ display: "flex" }}>
          {tags.map((tag, index) => (
            <a
              className={`chip lighten-2 ${randomColor(
                colors
              )} white-text px-2 py-2 mx-3 rounded`}
              style={{ height: "35px" }}
              key={index}
            >
              {tag}
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
              <a
                className="btn draw-border-blue"
                style={{ height: "50px" }}
              >
                {button || "Read More"}
              </a>
            </Link>
          ) : (
            <Link href={`/blogs/article/[id]`} as={`/blogs/article/${_id}`} replace>
              <a
                className="btn draw-border-blue"
                style={{ height: "50px" }}
              >
                {button || "Read More"}
              </a>
            </Link>
          )}

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
      </div>
    </>
  );
};

export default BlogListItem;

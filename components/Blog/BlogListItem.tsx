import Link from "next/link";
import "./BlogListItem.scss";
import api from "../../utils/Api";
import { useState } from "react";
import { randomColor } from "../../utils/Utils";
import Image from 'next/image'
const colors: string[] = [`blue`, `orange`, `cyan`, `indigo`, `green`];
export interface IBlogListItemProps {
  name: string;
  info: string;
  author: string;
  likes: number;
  tags: string[];
  button: string;
  createdDate: string;
  _id: any;
  image: string[];
  url: string;
  handleTheme: any;
}
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
  url,
  handleTheme,
}: IBlogListItemProps) => {
  const [likeCount, setCount] = useState<number>(likes);
  const [ifLiked, handleLike] = useState<boolean>(false);
  //@ts-ignore
  const likeAndUpdate = async (id: any, action: string) => {
    const heart = document.getElementById(`${id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    handleLike(!ifLiked);
    const response = await api.post(`/api/posts/likes/${id}/${action}`);

    return await response.data;
  };
  const cancelLike = async () => {
    const likesData = await likeAndUpdate(_id, "remove");
    setCount(likesData.likes);
  };
  const addLike = async () => {
    const likesData = await likeAndUpdate(_id, "add");
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
    tooltip.innerHTML =
      "Thank you! URL Copied! You can send it to your friends";
  };
  const cleanCopyText = () => {
    var tooltip = document.getElementById(`share-button-tip-${_id}`);
    tooltip.innerHTML = "Share with friends";
  };
  return (
    <>
      <div className="py-5 px-3" style={{ width: "100%" }}>
        <h3 className="mb-3">
          <span className="font-weight-bold">{name}</span>
        </h3>
        <div
          className="mb-2"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {tags.map((tag, index) => (
            <a
              className={`lighten-2 ${randomColor(
                colors
              )} white-text mx-2 px-2 py-1`}
              style={{ height: "30px" }}
              key={index}
            >
              <span className="font-weight-bold">{tag}</span>
            </a>
          ))}
        </div>
        <p className="">{info}</p>
        {image &&
          image.map((each, index) => (
            <Image src={each} key={index} alt="img" width="100%"></Image>
          ))}

        <span>
          作者:
          <span>{author}</span> <br />
          日期:<span>{createdDate}</span>
        </span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            href={`/blogs/article/[id]`}
            as={`/blogs/article/${_id}`}
            replace
          >
            <a
              className={`btn ${
                handleTheme() === "night"
                  ? "draw-border-white"
                  : "draw-border-black"
              }`}
              style={{ height: "50px" }}
            >
              {button || "View details"}
            </a>
          </Link>

          <div
            className="font-weight-bold"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="share-button"
              id={_id}
              onClick={handleCopyText}
              onMouseOut={cleanCopyText}
            >
              <span
                className="share-button-text"
                id={`share-button-tip-${_id}`}
              >
                Share with friends
              </span>
              <i className="fas fa-paper-plane fa-lg"></i>
            </div>
            <div
              className={`m-2 heart ${ifLiked ? "liked is_animating" : ""}`}
              onClick={ifLiked ? cancelLike : addLike}
              id={_id}
            >
              <em style={{ position: "absolute", right: "8%" }}>{likeCount}</em>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListItem;

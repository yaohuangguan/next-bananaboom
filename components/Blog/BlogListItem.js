import Link from "next/link";
import "./BlogListItem.scss";
import { useEffect } from "react";
import { randomColor } from "../Jumbo/Utils";
const BlogListItem = ({
  name,
  info,
  author,
  likes,
  tags,
  button,
  createdDate,
  _id,
  image
}) => {
  const handleHeart = async () => {
    const heart = document.getElementById(`${_id}`);
    heart.classList.toggle("is_animating");
    heart.classList.toggle("liked");
    const response = await fetch(
      `http://localhost:5000/api/posts/like/${_id}`,
      {
        method: "post"
      }
    );
    const data = await response.json();
    console.log(data);
    // heart.addEventListener("animationend", () => {
    //   heart.classList.toggle("is_animating");
    // });
    // heart.forEach(each => {
    //   each.classList.toggle('is_animating');
    //   each.classList.toggle('liked')
    //   each.addEventListener("animationend", () => {
    //     each.classList.toggle("is_animating");
    //   });
    // });
  };
  return (
    <div className="row">
      <div className="py-5 px-3">
        <h3 className="mb-3">
          <strong>{name}</strong>
        </h3>
        <div style={{ display: "flex" }}>
          {tags.map((tag, index) => (
            <a
              className={`chip lighten-2 ${randomColor([
                `yellow`,
                `green`,
                `purple`,
                `teal`,
                `blue`,
                `orange`,
                `cyan`,
                `indigo`
              ])} white-text px-2 py-2 mx-3 rounded`}
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
              <img src={each} key={index} alt="img"></img>
            ))
          : null}

        <span>
          created by:
          <span>{author}</span>, {createdDate}
        </span>
        <div>
          <div className="heart" onClick={handleHeart} id={_id}>
            <span>{likes} </span>
          </div>
        </div>
        <Link href={`/blogs/article/[id]`} as={`/blogs/article/${_id}`}>
          <a className="btn purple-gradient gradient">Read more</a>
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default BlogListItem;

import Link from "next/link";
import "./BlogListItem.scss";
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

        <p>
          created by:
          <span className="font-weight-bold">{author}</span>, {createdDate}
        </p>
        <p>
          {likes} <i className="fas fa-thumbs-up fa-lg"></i>
        </p>
        <Link href={`/blogs/article/[id]`} as={`/blogs/article/${_id}`}>
          <a className="btn purple-gradient gradient">Read more</a>
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default BlogListItem;

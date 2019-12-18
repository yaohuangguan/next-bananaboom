
import Link from "next/link";
import "./BlogListItem.scss";
const BlogListItem = props => {
  const { name, info, author, button, createdDate, id, image} = props;
  return (
    <div className="row">
      <div className="py-5 px-3">
        <h3 className="mb-3">
          <strong>{name}</strong>
        </h3>

        <p className="dark-grey-text">{info}</p>
        {image ? (image.map((each,index)=>(
          <img src={each} key={index}  alt='img'></img>
        ))):null}

        <p>
          created by:
          <span className="font-weight-bold">{author}</span>, {createdDate}
        </p>
        <Link href={`/blogs/article/[id]`} as={`/blogs/article/${id}`}>
          <a className="btn purple-gradient gradient">{button}</a>
        </Link>
      </div>
      <hr />
    </div>
  );
};

export default BlogListItem;

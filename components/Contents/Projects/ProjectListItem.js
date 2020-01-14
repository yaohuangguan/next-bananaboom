import { useRouter } from "next/router";
import "./Project.scss";
const Project = ({
  _id,
  link,
  image,
  name,
  _name,
  info,
  _info,
  width,
  height
}) => {
  // const hoverChange = () => {
  //   const div = document.querySelectorAll(".hover");
  //   div.forEach(element => {
  //     element.classList.add("purple-gradient");
  //   });
  // };
  // const recover = () => {
  //   const div = document.querySelectorAll(".hover");
  //   div.forEach(element => {
  //     element.classList.remove("purple-gradient");
  //   });
  // };
  const router = useRouter();

  return (
    <div
      className="col hover"
      // onMouseOver={hoverChange}
      // onMouseLeave={recover}
    >
      <div className="text-center">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          title="会打开外部链接 this will open external link"
        >
          <img
            data-src={image}
            className="lazyload"
            alt={router.pathname == "/chinese" ? name : _name}
            width={width}
            height={height}
          />
          <p className="linkTag">
            {router.pathname == "/chinese" ? name : _name}
          </p>
        </a>
      </div>
      <p>{router.pathname == "/chinese" ? info : _info}</p>
    </div>
  );
};

export default Project;

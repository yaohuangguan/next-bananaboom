import { useRouter } from "next/router";
import "./Project.scss";
export interface IProjectListItemProps {
  _id: string;
  link: string;
  image: string;
  name: string;
  _name: string;
  info: string;
  _info: string;
}
const Project = ({
  _id,
  link,
  image,
  name,
  _name,
  info,
  _info,
}: IProjectListItemProps) => {
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
      className="col-md-4 hover p-3"
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
            alt={router.pathname == "/zh" ? name : _name}
            width="60%"
          />
          <p className="linkTag">{router.pathname == "/zh" ? name : _name}</p>
        </a>
      </div>
      <p>{router.pathname == "/zh" ? info : _info}</p>
    </div>
  );
};

export default Project;

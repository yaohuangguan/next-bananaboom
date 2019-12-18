
import "./Project.scss";
const Project = props => {
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
  const { link, image, name, info, width, height } = props;
  return (
    <div
      className="col align-center hover"
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
          <img src={image} alt={name} width={width} height={height} />
          <p className="linkTag">{name}</p>
        </a>
      </div>
      <p>{info}</p>
    </div>
  );
};

export default Project;

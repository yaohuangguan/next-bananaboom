import { useEffect } from "react";

const PrivatePostItem = ({ tags, name, info, author, content,id }) => {

  useEffect(() => {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = content;
    return () => {};
  }, []);
  return (
    <div>
      <h3>
        {name}
      </h3>
      <span>{info}</span>
      <p>
        作者:{author}
      </p>
      <p>
        类型:{tags}
      </p>
      <div id={id}></div>
    </div>
  );
};

export default PrivatePostItem;

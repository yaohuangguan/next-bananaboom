import { useEffect } from "react";

const PrivatePostItem = ({ tags, name, info, author, content }) => {
  console.log(content)
  useEffect(() => {
    const contentDiv = document.getElementById("private-content");
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
      <div id="private-content"></div>
    </div>
  );
};

export default PrivatePostItem;

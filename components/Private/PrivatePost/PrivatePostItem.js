import { useEffect } from "react";

const PrivatePostItem = ({ tags, name, info, author, content, id,createdDate }) => {
  useEffect(() => {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = content;

    return () => {};
  }, []);
  return (
    <>
      <h3>{name}</h3>
      <span>{info}</span>
      <p>作者:{author}</p>
      <p>类型:{tags}</p>
      <p>日期:{createdDate}</p>
      <div id={id} style={{overflow:'hidden'}}></div>
    </>
  );
};

export default PrivatePostItem;

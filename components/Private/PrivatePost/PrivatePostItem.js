import { useEffect } from "react";

const PrivatePostItem = ({ tags, name, info, author, content, id,createdDate }) => {
  useEffect(() => {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = content;

    return () => {};
  }, []);
  return (
    <div style={{backgroundColor:'rgba(255,255,255,0.6)',padding:'40px',borderRadius:'50px', marginBottom:'20px'}} >
      <h3>{name}</h3>
      <span>{info}</span>
      <p>作者:{author}</p>
      <p>类型:{tags}</p>
      <p>日期:{createdDate}</p>
      <div id={id} width='100%' style={{overflow:'hidden'}}></div>
    </div>
  );
};

export default PrivatePostItem;

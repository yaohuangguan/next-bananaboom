import { useEffect } from "react";

const PrivatePostItem = ({
  tags,
  name,
  info,
  author,
  content,
  id,
  createdDate,
  code,
}) => {
  useEffect(() => {
    const contentDiv = document.getElementById(id);
    contentDiv.innerHTML = content;

    return () => {};
  }, []);
  return (
    <>
      <h3 style={{ color: "#FF69B4" }}>{name}</h3>
      <code>{info}</code> <br />
      <code>作者:{author}</code> <br />
      <code>类型:{tags.map((tag) => tag + ";")}</code> <br />
      <code>日期:{createdDate}</code> <br />
      <code>{code ? code : null}</code>
      <br />
      <div id={id} style={{ overflowX: "auto" }}></div>
    </>
  );
};

export default PrivatePostItem;

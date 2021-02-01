const Image = ({
  className = "",
  src = "",
  alt = "",
  width = "",
  height = "",
  style = {},
  title = "",
  onMouseOver = () => {},
}) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={style}
    width={width}
    height={height}
    title={title}
    onMouseOver={onMouseOver}
  />
);

export default Image;

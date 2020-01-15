import "./Background.scss";
export const getBeeHexImg = () => {
  return (
    <div className="view overlay text-center zoom z-depth-1">
      <img
        data-src="https://i.ibb.co/P5PjXwf/IMG-2938.jpg"
        alt="beehex"
        className="lazyload"
        width="100%"
      />

      <div className="mask flex-center rgba-stylish-light">
        <p className="white-text">2019 BeeHex Team</p>
      </div>
    </div>
  );
};

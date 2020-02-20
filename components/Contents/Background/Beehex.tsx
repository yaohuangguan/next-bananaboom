import "./Background.scss";
export const getBeeHexImg = () => {
  return (
    <div className="view overlay text-center zoom z-depth-1">
      <img
        data-src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582172681/WechatIMG7_o8oktj.jpg" 
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

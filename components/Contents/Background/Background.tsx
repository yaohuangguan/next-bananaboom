import Image from "../../../public/image";
// tslint:disable
const Background = () => {
  return (
    <div className="text-center row py-2">
      <div className="col-md-6 overlay zoom view my-2">
        <Image
          src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582172681/WechatImage5_trpzmw.jpg"
          className="z-depth-2 lazyload"
          width="100%"
          alt="my daily photos"
        />
        <div className="mask flex-center rgba-stylish-light">
          <p className="white-text">ME,ME,ME,STILL ME</p>
        </div>
      </div>
      <div className="col-md-6 overlay zoom view my-2">
        <Image
          src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582172681/WechatIMG6_fvqhbm.jpg"
          className="z-depth-2 lazyload"
          width="100%"
          alt="harvard model united nation"
        />
        <div className="mask flex-center rgba-stylish-light">
          <p className="white-text">Harvard Model United Nations</p>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Background;

import Image from 'next/image'
const Background = () => {
  return (
    <div className="text-center row py-2">
      {/* <div className="view overlay zoom w-50">
        <img
          data-src={"https://i.ibb.co/WK79MB2/self.jpg"}
          alt="me"
          width="100%"
          height="100%"
          className="rounded float-right zoom lazyload"
          id="me"
        />

        <div
          className="mask flex-center waves-effect waves-light"
          title={"这是我"}
        >
          <p className="text-muted text-center">This is Me at New Orleans</p>
        </div>
      </div> */}
      <div className="col-md-6 overlay zoom view my-2">
        <Image
          data-src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582172681/WechatImage5_trpzmw.jpg"
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
          data-src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582172681/WechatIMG6_fvqhbm.jpg"
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

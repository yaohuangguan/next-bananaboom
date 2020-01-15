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
        <img
          data-src="https://i.ibb.co/rfqqDGG/IMG-3208.jpg"
          className="z-depth-2 lazyload"
          width="100%"
          alt="HMUN"
        />
        <div className="mask flex-center rgba-stylish-light">
          <p className="white-text">ME,ME,ME,STILL ME</p>
        </div>
      </div>
      <div className="col-md-6 overlay zoom view my-2">
        <img
          data-src="https://i.ibb.co/YjSqnkX/IMG-3206.jpg"
          className="z-depth-2 lazyload"
          width="100%"
          alt="HMUN"
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

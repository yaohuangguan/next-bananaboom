import "../../Utils/LazyLoad";
const Background = () => {
  return (
    <div className="col-md-6">
      <div className="view overlay zoom">
        <img
          src={"https://i.ibb.co/WK79MB2/self.jpg"}
          alt="me"
          width="100%"
          height="100%"
          className="rounded float-right zoom lazy-load"
          id="me"
        />

        <div
          className="mask flex-center waves-effect waves-light"
          title={"这是我"}
        >
          <p className="text-muted text-center">This is Me at New Orleans</p>
        </div>
      </div>

      <br />
    </div>
  );
};

export default Background;

import React from "react";
import Link from "next/link";
import "./Jumbo.scss";

class Jumbo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: null
    };
  }

  componentDidMount() {
    this.checkMobile();
  }
  checkMobile = () => {
    console.log(navigator.userAgent);
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // some code..
      this.setState({ mobile: true });
    } else {
      this.setState({ mobile: false });
    }
  };
  render() {
    const { name, welcome, info, button, backgroundPicture } = this.props;
    const { mobile } = this.state;

    return (
      <div>
        <div
          className={`${backgroundPicture === true ? "english" : "chinese"} ${
            mobile ? "mobile" : ""
          } card card-image mb-4`}
        >
          <div
            className="text-white text-center rgba-stylish-light py-5 px-4"
            style={{ minHeight: "100vh" }}
          >
            <div className="py-5 mt-5 jumbo">
              <h3 className="text-white">
                {" "}
                <i className="fas fa-camera-retro"></i>
                {name}
              </h3>
              <h2 className="card-title h2 my-4 py-2 jumbo">{welcome}</h2>
              <p className="mb-4 pb-2 px-md-5 mx-md-5">{info}</p>

              <Link href="/blogs/blog">
                <a className="btn purple-gradient btn-rounded waves-effect font-weight-bold jumbo">
                  <i className="fas fa-space-shuttle left"></i> {button}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbo;

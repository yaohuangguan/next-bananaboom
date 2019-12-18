import React from "react";
import "./Footer.scss";
import SocialFooter from "./SocialFooter";
class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      closed: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.setOpen = setTimeout(this.openModal, 3000);
    this.timeId = setTimeout(() => {
      if (!this.closed) {
        console.log("Modal Closing");
        this.handleClose();
      }
    }, 20000);
  }

  componentWillUnmount() {
    console.log("The page is unmounted");
    clearTimeout(this.setOpen);
    clearTimeout(this.timeId);
    if (this.explain) {
      this.explain.removeEventListener("animationend", {});
    }
  }

  //使用method
  handleClose() {
    this.explain = document.getElementById("explain");
    const close = document.getElementById("close");
    close.style.display = "none";
    this.explain.style.display = "none";
    this.closed = true;
  }
  openModal() {
    this.explain = document.getElementById("explain");
    const close = document.getElementById("close");
    this.explain.style.display = "block";
    close.style.display = "block";
    this.explain.classList.add("animated", "fadeIn");
    this.explain.addEventListener("animationend", () =>
      this.explain.classList.remove("animated", "fadeIn")
    );
    console.log("Modal Opening");
  }

  render() {
    const {welcome,date} = this.props;
    return (
      <div className="mx-auto purple-gradient fixed-bottom" id="footer">
        <span
          className="float-right text-white px-1 font-weight-bold"
          style={{border:'1px solid white'}}
          id="close"
          onClick={this.handleClose}
        >
        X    
        </span>
        <div className="text-center">
          <span className="text-white" onClick={this.openModal}>
            {date}
          </span>
        </div>

        <div className="container text-center" id="explain">
          <p className="text-white">
            {welcome}
            <span role="img" aria-label="">
              🚀
            </span>
          </p>
          <SocialFooter />
        </div>
      </div>
    );
  }
}

export default Footer;

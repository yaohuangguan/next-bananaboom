import React, { useState, useEffect } from "react";
import "./Footer.scss";
import SocialFooter from "./SocialFooter";
const Footer = ({ welcome, date }) => {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const explain = document.getElementById("explain");
    let setOpen;
    if (!closed) {
      setOpen = setTimeout(openModal, 3000);
    }

    const timeId = setTimeout(() => {
      if (!closed) {
        handleClose();
      }
    }, 20000);
    return () => {
      clearTimeout(setOpen);
      clearTimeout(timeId);
      if (explain) {
        explain.removeEventListener("animationend", {});
      }
    };
  }, []);

  //使用method
  const handleClose = () => {
    const close = document.getElementById("close");
    close.style.display = "none";
    explain.style.display = "none";
    setClosed(true);
  };
  const openModal = () => {
    const close = document.getElementById("close");
    explain.style.display = "block";
    close.style.display = "block";
    explain.classList.add("animated", "fadeIn");
    explain.addEventListener("animationend", () =>
      explain.classList.remove("animated", "fadeIn")
    );
  };

  return (
    <div className="mx-auto purple-gradient fixed-bottom" id="footer">
      <span
        className="float-right text-white px-1 font-weight-bold"
        style={{ border: "1px solid white" }}
        id="close"
        onClick={handleClose}
      >
        X
      </span>
      <div className="text-center">
        <span className="text-white" onClick={openModal}>
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
};

export default Footer;

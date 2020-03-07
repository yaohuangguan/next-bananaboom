import { useState, useEffect } from "react";
import "./Jumbo.scss";

const Jumbo = ({ name, welcome, info, button, language, backgroundURL }) => {
  //// https://res.cloudinary.com/next-bananaboom/image/upload/v1582173503/WechatIMG11_ei3ugm.jpg

  const [mobile, setmobile] = useState(null);
  const checkMobile = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // some code..
      setmobile(true);
    } else {
      setmobile(false);
    }
  };
  useEffect(() => {
    checkMobile();
  }, [checkMobile]);

  return (
    <div className="jumbo-section">
      <video id="background-video" poster='https://res.cloudinary.com/next-bananaboom/image/upload/v1583502300/svg_flg6tm.gif' autoPlay loop muted playsInline>
        <source
          src={language === "english" ? "/video/en.webm" : "/video/c.webm"}
          type="video/webm"
        />
        <source
          src={language === "english" ? "/video/en.mpeg" : "/video/c.mpeg"}
          type="video/mp4"
        />
      </video>
      <div className="text-white text-center py-5 px-4 jumbo-wrapper">
        <div className="jumbo">
          <h1 className="card-subtitle mb-3">{name}</h1>
          <h2 className="card-title mb-5">{welcome}</h2>
          <h4 className="pb-2 my-4">{info}</h4>

          <a
            className="btn-hover color-3 btn jumbowave-effects card-button"
            href="#content"
          >
            &#9992; {button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Jumbo;

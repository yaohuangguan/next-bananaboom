import { useState, useEffect } from "react";
import "./Jumbo.scss";

const Jumbo = ({
  name,
  welcome,
  info,
  button,
  backgroundPicture,
  backgroundURL
}) => {
  const style = {
    backgroundImage: `url(${
      backgroundPicture ? backgroundURL.english : backgroundURL.chinese
    })`
  };
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
    <div className='jumbo-section'>
      <div
        style={style}
        className={`${backgroundPicture === true ? "english" : "chinese"} ${
          mobile ? "mobile" : ""
        } card card-image mb-4`}
      >
        <div
          className="text-white text-center rgba-stylish-light py-5 px-4"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
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
    </div>
  );
};

export default Jumbo;

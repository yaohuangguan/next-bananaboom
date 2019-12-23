import {useState,useEffect} from "react";
import Link from "next/link";
import "./Jumbo.scss";
import styled from "styled-components";


const Jumbo = ({ name, welcome, info, button, backgroundPicture }) => {

  const [mobile, setmobile] = useState(null)
  const checkMobile = () => {
    console.log(navigator.userAgent);
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // some code..
      setmobile(true)
    } else {
      setmobile(false)
    }
  };
    useEffect(() => {
      const abortController = new AbortController()
      checkMobile();
      return () => {
        abortController.abort()
      };
    }, [checkMobile])

    return (
      <div style={{fontFamily:'Audiowide'}}>
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
              <h3 className="text-white name">

                <i className="fas fa-camera-retro"></i>
                {name}
              </h3>
              <h2 className="card-title h2 my-4 py-2 jumbo neon-style-5">{welcome}</h2>
              <p className="mb-4 pb-2 px-md-5 mx-md-5">{info}</p>


              
                <a className="btn-hover color-3 btn jumbo wave-effects" href='#content'>
                  <i className="fas fa-space-shuttle left"></i> {button}
                </a>

            </div>
          </div>
        </div>
      </div>
    );

}

export default Jumbo;

import React, { useRef } from "react";

const Pay = () => {
  const pay = useRef(null);
  const handleChange = () => {
    pay.current.style.visibility = "visible";
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative"
        }}
        onClick={handleChange}
      >
        <img
          src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582866923/dashang_r3ltt4.jpg"
          width="10%"
          alt="da shang"
          style={{}}
        />

          <img
            src="/pay.jpeg"
            alt="wechat pay"
            width="20%"
            style={{ position: "absolute", visibility: "hidden" }}
            ref={pay}
          />


      </div>
    </div>
  );
};

export default Pay;

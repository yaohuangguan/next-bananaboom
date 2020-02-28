import React, { useRef } from "react";

const Pay = () => {
  const pay = useRef(null);
  const dashang = useRef(null)
  const handleChange = () => {
    pay.current.style.visibility = "visible";
    dashang.current.style.visibility = "hidden";
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection:'column',
          justifyContent: "center",
          alignItems:'center',
          position: "relative"
        }}
        onClick={handleChange}
      >
        <div ref={dashang} style={{textAlign:'center'}}>
          <p>Thank you for your support!!</p>
          <img
            src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582866923/dashang_r3ltt4.jpg"
            width="40%"
            alt="da shang"
          />
        </div>

        <img
          src="/pay.jpeg"
          alt="wechat pay"
          width="30%"
          style={{ position: "absolute", visibility: "hidden" }}
          ref={pay}
        />
       
      </div>
    </>
  );
};

export default Pay;

import React, { useRef } from "react";

const Pay = () => {
  const pay = useRef(null);
  const dashang = useRef(null);
  const handleChange = () => {
    pay.current.style.visibility = "visible";
    dashang.current.style.visibility = "hidden";
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative"
        }}
        className='text-center'
        onClick={handleChange}
      >
        <div ref={dashang}>
          <p>Thank you for your support!!</p>
          <img
            src="https://res.cloudinary.com/next-bananaboom/image/upload/v1582866923/dashang_r3ltt4.jpg"
            width="20%"
            alt="da shang"
          />
        </div>

        <div
          ref={pay}
          style={{
            position: "absolute",
            visibility: "hidden"
          }}
        >
          <img src="/pay.jpeg" alt="wechat pay" width="35%" />
        </div>
      </div>
    </>
  );
};

export default Pay;

import React, { useEffect } from "react";
import { useRouter } from "next/router";
import api from "../../utils/Api";
import "../../components/FloatingHeart/heart.scss";
const index = ({ currentUser }) => {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      if (currentUser) {
        if (currentUser.vip) {
          return null;
        }
      }
      return router.back();
    };
    checkLogin();
    return () => {};
  }, [currentUser]);
  const getVip = () => (currentUser ? currentUser.vip : null);
  return (
    <div>
      {getVip() ? (

         
          <div className="row">
            <div className="col p-3 m-3">
              <h1>
                Sam{" "}
                <svg className="heart-purple" viewBox="0 0 32 30">
                  <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
  	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                  />
                </svg>{" "}
                Cennifer的秘密基地
              </h1>
            </div>
            <div
              id="messages"
              className="mx-auto"
            ></div>

            <div className="input">
            
              <input
                type="text"
                className="heart-input"
                placeholder="输入内容"
              />
              <button
                type="submit"
                style={{
                  color: "rgb(142, 61, 247)",
                  padding: "2px",
                  borderRadius: "20px",
                  width: "50px",
                  fontSize: "20px"
                }}
              >
                ❤
              </button>
            </div>
            <div className="col-lg-8"></div>
          </div>

      ) : null}
    </div>
  );
};

export default index;

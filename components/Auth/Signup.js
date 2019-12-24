import { useEffect, useState } from "react";
import router from "next/router";
import Login from "./Login";

const Signup = ({ login }) => {
  const openSignup = e => {
    const modalContainer = document.querySelector("#signup-container");
    modalContainer.removeAttribute("class");
    modalContainer.classList.add("popup");
    document.body.classList.add("modal-active");
  };
  const closeSignup = () => {
    document.getElementById("signup-container").classList.add("out");
    document.body.classList.remove("modal-active");
  };
  const openLogin = e => {
    closeSignup();
    const modalContainer = document.querySelector("#login-container");
    modalContainer.removeAttribute("class");
    modalContainer.classList.add("popup");
    document.body.classList.add("modal-active");
  };
  const loginWithGoogle = async () => {
    const response = await fetch("http://localhost:5000/api/auth/google");
    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <Login loginWithGoogle={loginWithGoogle}></Login>
      <div id="signup-container">
        <div className="modal-background text-white ">
          <form
            className="text-center rgba-stylish-strong  px-5 form-a"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
            action="#!"
          >
            <div
              onClick={closeSignup}
              className="py-2 px-2 text-success"
              style={{ alignSelf: "flex-end" }}
            >
              <span style={{ fontSize: "30px" }}>&#10005;</span>
            </div>
            <p className="h4 mb-4">
              {router.pathname == "/" ? "Sign up" : "注册新用户"}
            </p>

            <div className="form-row mb-4">
              <div className="col">
                <input
                  type="text"
                  className="form-control form-control-lg form-control-a text-center"
                  autoComplete="username"
                  placeholder={router.pathname == "/" ? "Username" : "用户名"}
                />
              </div>
            </div>

            <input
              type="email"
              className="form-control form-control-lg form-control-a text-center mb-4"
              autoComplete="email"
              placeholder={router.pathname == "/" ? "email" : "邮箱地址"}
            />

            <input
              type="password"
              className="form-control form-control-lg form-control-a text-center"
              autoComplete="current-password"
              placeholder={router.pathname == "/" ? "password" : "密码"}
            />

            <button
              className="btn draw-border-white my-4 btn-block"
              type="submit"
            >
              {router.pathname == "/" ? "Sign up" : "确定"}
            </button>

            <p>
              {router.pathname == "/"
                ? "or sign up with:"
                : "或者使用以下方法注册:"}
            </p>
            <div className="login-list">
              <div onClick={loginWithGoogle}>
                <img
                  src="https://img.icons8.com/color/30/000000/google-logo.png"
                  className="px-1"
                />
              </div>
              <img
                src="https://img.icons8.com/color/30/000000/weixing.png"
                className="px-1"
              />
            </div>
            <br />
            <p style={{ alignSelf: "flex-end" }} onClick={openLogin}>
              {router.pathname == "/" ? "I already have account" : "我已有账户"}
            </p>
          </form>
        </div>
      </div>
      <div className="loginButton">
        <div className="buttons">
          <div className="button" onClick={openSignup}>
            {login}
          </div>
        </div>
      </div>
    </div>
  );
};
Signup.getInitialProps = () => {
  return (
    require("./login.scss"),
    require("../Header/Header.scss"),
    require("../Subscribe/Subscribe.scss")
  );
};

export default Signup;

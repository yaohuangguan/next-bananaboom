import { useEffect, useState } from "react";
import router from "next/router";
import Login from "./Login";
import firebase from "../../firebase/firebase";
const Signup = ({ login }) => {
  const openSignup = e => {
    const modalContainer = document.querySelector("#signup-container");
    modalContainer.removeAttribute("class");
    modalContainer.classList.add("popup");

  };
  const closeSignup = () => {
    document.getElementById("signup-container").classList.add("out");

  };
  const openLogin = e => {
    closeSignup();
    const modalContainer = document.querySelector("#login-container");
    modalContainer.removeAttribute("class");
    modalContainer.classList.add("popup");

  }

  return (
    <div>
      <Login></Login>
      <div id="signup-container">
        <div className="modal-background text-white lazy-load">
          <form
            className="text-center modal-inner px-5 form-a"
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

            <input
              type="text"
              className="form-control form-control-lg form-control-a text-center  mb-4"
              autoComplete="username"
              placeholder={router.pathname == "/" ? "Username" : "用户名"}
            />

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
              <div onClick={firebase.signInWithGoogle}>
                <img
                  src="https://img.icons8.com/color/30/000000/google-logo.png"
                  className="px-1"
                  alt='googlelogin'
                />
              </div>
              <img
                src="https://img.icons8.com/color/30/000000/weixing.png"
                className="px-1"
                alt='weixinsignin'
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

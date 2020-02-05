import { useEffect, useState, useRef } from "react";
import router from "next/router";
import firebase from "../../firebase/firebase";
import api from "../../utils/Api";

const Login = ({ passwordReveal }) => {
  const LoginContainer = useRef(null);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState([]);

  const closeLogin = () => {
    LoginContainer.current.classList.add("out");
  };
  const openSignup = e => {
    closeLogin();
    const modalContainer = document.querySelector(".signup-container");
    modalContainer.classList.remove("out");
    modalContainer.classList.add("popup");
  };
  const clearInput = () => {
    setemail("");
    setpassword("");
    seterrors([]);
  };
  const handleEmail = e => {
    setemail(e.target.value);
  };
  const handlePassword = e => {
    setpassword(e.target.value);
  };

  const handleUserSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      const shakeMessage = document.querySelector(".shake-target");
      shakeMessage.classList.toggle("shake-message");
      return seterrors(["填写完整信息(Fill all the requirements)"]);
    }
    try {
      const response = await api.post("/api/users/signin", {
        email,
        password
      });
      // console.log(response.data.userToSend);
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.userToSend)
      );
      router.reload();
      clearInput();
      closeLogin();
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message) {
        seterrors(error.response.data.message);
      }
      if (error.response.data.errors) {
        const errors = error.response.data.errors.map(each => `  ${each.msg}`);
        seterrors(errors);
      }
    }
  };
  const getLoginNameOnRoutes = () => router.pathname == "/" ? "Log into your account" : "登录"
  const getEmailOnRoutes = () => router.pathname === "/" ? "Email" : "邮箱地址"
  const getPasswordOnRoutes = () => router.pathname === "/" ? "Password" : "密码"
  const getLoginButtonOnRoutes = () => router.pathname == "/" ? "Login" : "确定"
  const getSignUpOnRoutes = () => router.pathname == "/" ? "I don't have account" : "我要注册"
  const getLoginMethodOnRoutes = () => router.pathname == "/"
  ? "or log in with:"
  : "或者使用以下方法登录:"
  return (
    <div>
      <div ref={LoginContainer} className="login-container">
        <div className="modal-background text-dark lazy-load shake-target card">
          <form
            className="modal-inner px-5 py-1 form-auth"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div
              onClick={closeLogin}
              className="py-2 px-2 text-dark"
              style={{ alignSelf: "flex-end" }}
            >
              <span style={{ fontSize: "30px" }}>&#10005;</span>
            </div>
            <h4 className="mb-4">
              {getLoginNameOnRoutes()}
            </h4>
            {errors ? <div className="text-danger">{errors}</div> : null}
            <label htmlFor="login-email" className="m-0 text-dark">
            {getEmailOnRoutes()}
            </label>
            <input
              type="email"
              id="login-email"
              className="form-control form-control-lg form-control-a text-center mb-4"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
              placeholder={getEmailOnRoutes()}
            />
            <label htmlFor="login-password" className="m-0 text-dark">
            {getPasswordOnRoutes()}
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="password"
                id="login-password"
                className="form-control form-control-lg form-control-a text-center password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                placeholder={getPasswordOnRoutes()}
              />
              <div onClick={passwordReveal} className="password-show">
                <img
                  src="https://img.icons8.com/ios-glyphs/20/000000/visible.png"
                  alt="icon"
                />{" "}
              </div>
            </div>

            <button
              className="btn btn-hover color-3 my-4 btn-block text-white"
              type="submit"
              onClick={handleUserSubmit}
            >
              {getLoginButtonOnRoutes()}
            </button>

            <p className="text-center">
              {getLoginMethodOnRoutes()}
            </p>
            <div className="login-list">
              <div onClick={firebase.signInWithGoogle}>
                <img
                  src="https://img.icons8.com/color/30/000000/google-logo.png"
                  className="px-1"
                  alt="googlesignin"
                />
              </div>
              <img
                src="https://img.icons8.com/color/30/000000/weixing.png"
                className="px-1"
                alt="weixinsignin"
              />
            </div>
            <br />
            <p
              style={{
                alignSelf: "flex-end",
                textDecoration: "underline",
                cursor: "pointer"
              }}
              onClick={openSignup}
            >
              {getSignUpOnRoutes()}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
Login.getInitialProps = () => {
  return (
    require("./login.scss"),
    require("../Header/Header.scss"),
    require("../Subscribe/Subscribe.scss")
  );
};

export default Login;

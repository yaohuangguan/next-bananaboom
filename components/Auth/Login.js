import { useEffect, useState } from "react";
import router from "next/router";
import firebase from "../../firebase/firebase";
import api from '../../utils/Api'

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState([]);
  const [token, settoken] = useState(localStorage.getItem("token") );
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  );

  const closeLogin = () => {
    document.getElementById("login-container").classList.add("out");
  };
  const openSignup = e => {
    closeLogin();
    const modalContainer = document.querySelector("#signup-container");
    modalContainer.removeAttribute("class");
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
    if (!email || !password) return seterrors("Fill all the requirements");
    try {
      const response = await api.post("/api/users/signin", {
        email,
        password
      });
      settoken(response.data.token);
      setuser(response.data.user);
      console.log(response);
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.user)
      );
      router.reload()
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
  return (
    <div>
      <div id="login-container">
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
              onClick={closeLogin}
              className="py-2 px-2 text-success"
              style={{ alignSelf: "flex-end" }}
            >
              <span style={{ fontSize: "30px" }}>&#10005;</span>
            </div>
            <p className="h4 mb-4">
              {router.pathname == "/" ? "Log into your account" : "用户登录"}
            </p>
            {errors ? <div className="text-danger">{errors}</div> : null}
            <input
              type="email"
              className="form-control form-control-lg form-control-a text-center mb-4"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
              placeholder={
                router.pathname == "/"
                  ? "email"
                  : "注册时的邮箱"
              }
            />

            <input
              type="password"
              className="form-control form-control-lg form-control-a text-center"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
              placeholder={router.pathname == "/" ? "password" : "密码"}
            />

            <button
              className="btn draw-border-white my-4 btn-block"
              type="submit"
              onClick={handleUserSubmit}
            >
              {router.pathname == "/" ? "Login" : "确定"}
            </button>

            <p>
              {router.pathname == "/"
                ? "or log in with:"
                : "或者使用以下方法登录:"}
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
            <p style={{ alignSelf: "flex-end" }} onClick={openSignup}>
              {router.pathname == "/" ? "I don't have account" : "我要注册"}
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

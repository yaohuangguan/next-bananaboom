import { useEffect, useState } from "react";
import router from "next/router";
import firebase from "../../firebase/firebase";
import api from "../../utils/Api";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("./Login"), {
  ssr: false
});
const Signup = ({ login }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [passwordConf, setpasswordConf] = useState("");
  const [errors, seterrors] = useState([]);
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [user, setuser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || []
  );

  const openSignup = e => {
    const modalContainer = document.querySelector(".signup-container");
    modalContainer.classList.remove("out");
    modalContainer.classList.add("popup");
    document.body.classList.add("modal-active");
  };
  const closeSignup = () => {
    document.querySelector(".signup-container").classList.add("out");
    document.body.classList.remove("modal-active");
  };
  const passwordReveal = e => {
    let x = document.querySelectorAll(".password");
    x.forEach(each => {
      if (each.type === "password") {
        each.type = "text";
      } else {
        each.type = "password";
      }
    });
  };
  const clearInput = () => {
    setemail("");
    setpassword("");
    setdisplayName("");
    seterrors([]);
    setpasswordConf("");
  };
  const handleDisplayName = e => {
    setdisplayName(e.target.value);
  };
  const handleEmail = e => {
    setemail(e.target.value);
  };
  const handlePasswordConf = e => {
    setpasswordConf(e.target.value);
  };
  const handlePassword = e => {
    setpassword(e.target.value);
  };
  const openLogin = e => {
    closeSignup();
    const modalContainer = document.querySelector(".login-container");
    modalContainer.classList.remove("out");
    modalContainer.classList.add("popup");
    document.body.classList.add("modal-active");
  };
  const handleUserSubmit = async e => {
    e.preventDefault();
    if (!displayName || !email || !password || !passwordConf) {
      const shakeMessage = document.querySelector(".shake-target-signup");
      shakeMessage.classList.toggle("shake-message");
      return seterrors("填写完整信息(Fill all the requirements)");
    }

    try {
      const response = await api.post("/api/users", {
        displayName,
        email,
        password,
        passwordConf
      });
      settoken(response.data.token);
      setuser(response.data.user);
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.user)
      );
      router.reload();
      console.log(response);
      clearInput();
      closeSignup();
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
      <Login passwordReveal={passwordReveal}></Login>
      <div className="signup-container">
        <div className="modal-background text-white lazy-load shake-target-signup">
          <form
            className="text-center modal-inner px-5 py-1 form-auth"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              onClick={closeSignup}
              className="py-2 px-2 text-success"
              style={{ alignSelf: "flex-end" }}
            >
              <span style={{ fontSize: "30px" }}>&#10005;</span>
            </div>
            <h4 className="mb-4">
              {router.pathname == "/" ? "Sign up" : "注册新用户"}
            </h4>
            {errors ? <div className="text-danger">{errors}</div> : null}
            <label htmlFor="signup-displayName" className="m-0 text-light">
              displayName
            </label>
            <input
              type="text"
              id="signup-displayName"
              className="form-control form-control-lg form-control-a text-center mb-3"
              autoComplete="username"
              value={displayName}
              onChange={handleDisplayName}
              placeholder={router.pathname == "/" ? "Username" : "用户名"}
            />

            <label htmlFor="signup-email" className="m-0 text-light">
              Email
            </label>
            <input
              type="email"
              id="signup-email"
              className="form-control form-control-lg form-control-a text-center mb-3"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
              placeholder={router.pathname == "/" ? "email" : "邮箱地址"}
            />

            <label htmlFor="signup-password" className="m-0 text-light">
              Password
            </label>
            <div
              className="tooltips"
              style={{ position: "relative", width: "100%" }}
            >
              <input
                type="password"
                id="signup-password"
                className="form-control form-control-a text-center mb-3 password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                placeholder={router.pathname == "/" ? "password" : "密码"}
              />

              <span className="tooltiptext">
                {router.pathname == "/"
                  ? "Password should be more than 6 characters"
                  : "密码至少需6位以上"}
              </span>

              <div onClick={passwordReveal} className="password-show">
                <img
                  src="https://img.icons8.com/ios-glyphs/20/000000/visible.png"
                  alt="icon"
                />
              </div>
            </div>
            <label htmlFor="signup-passwordConf" className="m-0 text-light">
              Confirm Password
            </label>
            <input
              type="password"
              id="signup-passwordConf"
              className="form-control form-control-lg form-control-a text-center password"
              autoComplete="current-password"
              value={passwordConf}
              onChange={handlePasswordConf}
              placeholder={
                router.pathname == "/" ? "password confirmation" : "确认密码"
              }
            />

            <button
              className="btn draw-border-white my-4 btn-block"
              type="submit"
              onClick={handleUserSubmit}
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
                  alt="googlelogin"
                />
              </div>
              <img
                src="https://img.icons8.com/color/30/000000/weixing.png"
                className="px-1"
                alt="weixinsignin"
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

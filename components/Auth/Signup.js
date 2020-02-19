import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import firebase from "../../firebase/firebase";
import api from "../../utils/Api";
import Loader from '../Loader/Loader'
import dynamic from "next/dynamic";
const Login = dynamic(() => import("./Login"), {
  ssr: false
});
const Signup = ({ linkColor }) => {
  const router = useRouter();
  const SignupContainer = useRef(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [passwordConf, setpasswordConf] = useState("");
  const [errors, seterrors] = useState([]);
  const [loading, setloading] = useState(false)
  const openSignup = e => {
    SignupContainer.current.classList.remove("out");
    SignupContainer.current.classList.add("popup");
  };
  const closeSignup = () => {
    SignupContainer.current.classList.add("out");
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
  };
  const validEmail = () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const validPassword = () =>{
    let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return re.test(password)
  }
  const handleUserSubmit = async e => {
    e.preventDefault();
    if (!displayName || !email || !password || !passwordConf) {
      const shakeMessage = document.querySelector(".shake-target-signup");
      shakeMessage.classList.toggle("shake-message");
      return seterrors(["填写完整信息(Fill all the requirements)"]);
    }
    if(!validPassword()) {
      return seterrors(["信息不符合要求"]);
    }
    if(!validEmail()){
      return seterrors(["信息不符合要求"]);
    }
    try {
      setloading(true)
      const response = await api.post("/api/users", {
        displayName,
        email,
        password,
        passwordConf
      });
      const user = await response.data.userToSend
      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );
      router.reload();
      console.log(response);
      clearInput();
      closeSignup();
    } catch (error) {
      setloading(false)
      if (error.response.data.message) {
        seterrors(error.response.data.message);
      }
      if (error.response.data.errors) {
        const errors = error.response.data.errors.map(each => `  ${each.msg}`);
        seterrors(errors);
      }
    }
  };
  const getSignupNameOnRoutes = () =>
    router.pathname === "/" ? "Sign up" : "免费注册";
  const getUserOnRoutes = () =>
    router.pathname === "/" ? "Username" : "用户名";
  const getEmailOnRoutes = () =>
    router.pathname === "/" ? "Email" : "邮箱地址";
  const getPasswordOnRoutes = () =>
    router.pathname === "/" ? "Password" : "密码";
  const getPasswordTipOnRoutes = () =>
    router.pathname === "/"
      ? "Password should be more than 8 characters,including numbers and letters"
      : "密码至少需8位以上,包括数字和字母";
  const getConfirmPasswordOnRoutes = () =>
    router.pathname === "/" ? "Confirm Password" : "确认密码";
  const getSubmitButtonOnRoutes = () =>
    router.pathname === "/" ? "Sign up" : "确定";
  const getSignUpMethodOnRoutes = () =>
    router.pathname === "/" ? "or sign up with:" : "或者使用以下方法注册:";
  const getAlreadyUserOnRoutes = () =>
    router.pathname === "/" ? "I already have account" : "我已有账户";
  const getLoginTextOnRoutes = () =>
    router.pathname === "/" ? "Login/Register" : "登录/注册";
  return (
    <div>
      <div ref={SignupContainer} className="signup-container">
        <div className="modal-background text-dark lazy-load shake-target-signup card">
          <form
            className="modal-inner px-5 py-1 form-auth"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div className="signup-title">
              <h4 className="py-3 mt-3">
                {getSignupNameOnRoutes()}{" "}
               
              </h4>
              <span
                  style={{ fontSize: "30px" }}
                  onClick={closeSignup}
                >
                  &#10005;
                </span>
            </div>
            {errors ? <div className="text-danger">{errors}</div> : null}
            <label htmlFor="signup-displayName" className="m-0 text-dark">
              {getUserOnRoutes()}
            </label>
            <input
              type="text"
              id="signup-displayName"
              className="form-control form-control-lg form-control-a text-center mb-3"
              autoComplete="username"
              value={displayName}
              onChange={handleDisplayName}
              placeholder={getUserOnRoutes()}
            />

            <label htmlFor="signup-email" className="m-0 text-dark">
              {getEmailOnRoutes()}
            </label>
            <input
              type="email"
              id="signup-email"
              className="form-control form-control-lg form-control-a text-center mb-3"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
              placeholder={getEmailOnRoutes()}
            />

            <label htmlFor="signup-password" className="m-0 text-dark">
              {getPasswordOnRoutes()}
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
                placeholder={getPasswordOnRoutes()}
              />

              <span className="tooltiptext">{getPasswordTipOnRoutes()}</span>

              <div onClick={passwordReveal} className="password-show">
                <img
                  src="https://img.icons8.com/ios-glyphs/20/000000/visible.png"
                  alt="icon"
                />
              </div>
            </div>
            <label htmlFor="signup-passwordConf" className="m-0 text-dark">
              {getConfirmPasswordOnRoutes()}
            </label>
            <input
              type="password"
              id="signup-passwordConf"
              className="form-control form-control-lg form-control-a text-center password"
              autoComplete="current-password"
              value={passwordConf}
              onChange={handlePasswordConf}
              placeholder={getConfirmPasswordOnRoutes()}
            />

            <button
              className="btn btn-hover color-3 my-4 mx-0 text-white"
              type="submit"
              onClick={handleUserSubmit}
            >
              {!loading ? getSubmitButtonOnRoutes() : <Loader></Loader>}
            </button>

            <p className="text-center">{getSignUpMethodOnRoutes()}</p>
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
            <p
              style={{
                alignSelf: "flex-end",
                textDecoration: "underline",
                cursor: "pointer",
                color: "blue"
              }}
              onClick={openLogin}
            >
              {getAlreadyUserOnRoutes()}
            </p>
          </form>
        </div>
      </div>
      <div className="loginButton">
        <a className={`${linkColor || ""}`} onClick={openSignup}>
          {getLoginTextOnRoutes()}
        </a>
      </div>
      <Login passwordReveal={passwordReveal}></Login>
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

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import firebase from "../../firebase/firebase";
import api from "../../utils/Api";
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
  const handleUserSubmit = async e => {
    e.preventDefault();
    if (!displayName || !email || !password || !passwordConf) {
      const shakeMessage = document.querySelector(".shake-target-signup");
      shakeMessage.classList.toggle("shake-message");
      return seterrors(["填写完整信息(Fill all the requirements)"]);
    }

    try {
      const response = await api.post("/api/users", {
        displayName,
        email,
        password,
        passwordConf
      });

      window.localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.userToSend)
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
  const getSignupNameOnRoutes = () =>
    router.pathname === "/" ? "Sign up" : "注册";
  const getUserOnRoutes = () =>
    router.pathname === "/" ? "Username" : "用户名";
  const getEmailOnRoutes = () =>
    router.pathname === "/" ? "Email" : "邮箱地址";
  const getPasswordOnRoutes = () =>
    router.pathname === "/" ? "Password" : "密码";
  const getPasswordTipOnRoutes = () =>
    router.pathname === "/"
      ? "Password should be more than 6 characters"
      : "密码至少需6位以上";
  const getConfirmPasswordOnRoutes = () =>
    router.pathname === "/" ? "Confirm Password" : "确认密码";
  const getSubmitButtonOnRoutes = () =>
    router.pathname === "/" ? "Sign up" : "确定";
  const getSignUpMethodOnRoutes = () =>
    router.pathname === "/" ? "or sign up with:" : "或者使用以下方法注册:";
  const getAlreadyUserOnRoutes = () =>
    router.pathname === "/" ? "I already have account" : "我已有账户";
  const getLoginTextOnRoutes = () =>
    router.pathname === "/" ? "Login" : "登录";
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
            <div
              onClick={closeSignup}
              className="py-2 px-2 text-dark"
              style={{ alignSelf: "flex-end" }}
            >
              <span style={{ fontSize: "30px" }}>&#10005;</span>
            </div>
            <h4 className="mb-4 text-dark">{getSignupNameOnRoutes()}</h4>
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
              className="btn btn-hover color-3 my-4 btn-block text-white"
              type="submit"
              onClick={handleUserSubmit}
            >
              {getSubmitButtonOnRoutes()}
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
                cursor: "pointer"
              }}
              onClick={openLogin}
            >
              {getAlreadyUserOnRoutes()}
            </p>
          </form>
        </div>
      </div>
      <div className="loginButton">
        <div className="buttons">
          <div
            className={`button ${linkColor || "text-white"}`}
            onClick={openSignup}
          >
            {getLoginTextOnRoutes()}
          </div>
        </div>
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

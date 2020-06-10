import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import firebase from "../../firebase/firebase";
import {signUp} from '../../service'
import Loader from "../Loader/Loader";
import Login from "./Login";
const Signup = ({ linkColor }: { linkColor?: string }) => {
  const router = useRouter();
  const SignupContainer = useRef(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [passwordConf, setpasswordConf] = useState("");
  const [errors, seterrors] = useState([]);
  const [loading, setloading] = useState(false);
  const openSignup = (_e: any) => {
    SignupContainer.current.classList.remove("out");
    SignupContainer.current.classList.add("popup");
    const loginContainer: any = document.querySelector(".login-container");
    closeLogin(loginContainer);
  };

  const closeSignup = () => {
    SignupContainer.current.classList.add("out");
  };
  const closeLogin = (container: { current: any; classList: any }): any => {
    container.current
      ? container.current.classList.add("out")
      : container.classList.add("out");
  };
  const passwordReveal = (_e: any) => {
    let x = document.querySelectorAll(".password");
    x.forEach((each: any) => {
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
  const handleDisplayName = (e: any) => {
    setdisplayName(e.target.value);
  };
  const handleEmail = (e: any) => {
    setemail(e.target.value);
  };
  const handlePasswordConf = (e: any) => {
    setpasswordConf(e.target.value);
  };
  const handlePassword = (e: any) => {
    setpassword(e.target.value);
  };
  const openLogin = () => {
    closeSignup();
    const modalContainer = document.querySelector(".login-container");
    modalContainer.classList.remove("out");
    modalContainer.classList.add("popup");
  };
  const validEmail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const validPassword = () => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!displayName || !email || !password || !passwordConf) {
      const shakeMessage = document.querySelector(".shake-target-signup");
      shakeMessage.classList.toggle("shake-message");
      const error =
        router.pathname === "/zh"
          ? "填写全部信息"
          : "Fill all the requirements";
      return seterrors([error]);
    }
    if (!validPassword()) {
      const error =
        router.pathname === "/zh" ? "密码不符合要求" : "Bad Password.";
      return seterrors([error]);
    }
    if (!validEmail()) {
      const error =
        router.pathname === "/zh" ? "提供有效邮箱" : "Email not valid.";
      return seterrors([error]);
    }
    if (password !== passwordConf) {
      const error =
        router.pathname === "/zh" ? "密码输入不相符" : "Password don't match";
      return seterrors([error]);
    }
    try {
      if (!loading) {
        setloading(true);
        const user = await signUp({
          displayName,
          email,
          password,
          passwordConf,
        });
        if (typeof window != "undefined") {
          window.localStorage.setItem("token", user.token);
        }

        router.reload();

        clearInput();
        closeSignup();
      }
    } catch (error) {
      setloading(false);
      if (error.response.data) {
        const _error =
          router.pathname === "/"
            ? error.response.data.message
            : error.response.data.message_cn;
        seterrors(_error);
      }
      if (error.response.data.errors) {
        const _error = error.response.data.errors.map(
          (each: any) => `  ${each.msg}`
        );
        seterrors(_error);
      }
    }
  };
  const getSignupNameOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Sign up" : "免费注册"),
    [router.pathname]
  );

  const getUserOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Username" : "用户名"),
    [router.pathname]
  );
  const getEmailOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Email" : "邮箱地址"),
    [router.pathname]
  );

  const getPasswordOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Password" : "密码"),
    [router.pathname]
  );
  const getPasswordTipOnRoutes = useMemo(
    () =>
      router.pathname === "/"
        ? "Password should be more than 8 characters,including numbers and letters"
        : "密码至少需8位以上,包括数字和字母",
    [router.pathname]
  );
  const getConfirmPasswordOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Confirm Password" : "确认密码"),
    [router.pathname]
  );
  const getSubmitButtonOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Sign up" : "确定"),
    [router.pathname]
  );
  const getSignUpMethodOnRoutes = useMemo(
    () =>
      router.pathname === "/" ? "or sign up with:" : "或者使用以下方法注册:",
    [router.pathname]
  );
  const getAlreadyUserOnRoutes = useMemo(
    () =>
      router.pathname === "/"
        ? "I already have an account"
        : "我已有账户,去登录",
    [router.pathname]
  );
  const getLoginTextOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Login/Signup" : "免费注册"),
    [router.pathname]
  );
  return (
    <>
      <div ref={SignupContainer} className="signup-container">
        <div className="modal-background text-dark lazy-load shake-target-signup card">
          <form
            className="modal-inner px-5 py-1 form-auth"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onSubmit={handleUserSubmit}
          >
            <div className="signup-title">
              <h5 className="py-3 mt-3">{getSignupNameOnRoutes} </h5>
              <span
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={closeSignup}
              >
                &#10005;
              </span>
            </div>
            {errors ? (
              <span className="text-danger error-div">{errors}</span>
            ) : null}
            <label htmlFor="signup-displayName" className="m-0 text-dark">
              {getUserOnRoutes}
            </label>
            <input
              type="text"
              id="signup-displayName"
              className="form-control form-control-lg form-control-a text-center mb-3"
              autoComplete="username"
              value={displayName}
              onChange={handleDisplayName}
              placeholder={getUserOnRoutes}
            />

            <label htmlFor="signup-email" className="m-0 text-dark">
              {getEmailOnRoutes}
            </label>
            <input
              type="email"
              id="signup-email"
              className="form-control form-control-lg form-control-a text-center mb-3"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
              placeholder={getEmailOnRoutes}
            />

            <label htmlFor="signup-password" className="m-0 text-dark">
              {getPasswordOnRoutes}
            </label>
            <div
              className="tooltips"
            >
              <input
                type="password"
                id="signup-password"
                className="form-control form-control-a text-center mb-3 password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                placeholder={getPasswordOnRoutes}
              />

              <span className="tooltiptext">{getPasswordTipOnRoutes}</span>

              <div onClick={passwordReveal} className="password-show">
                <img
                  src="https://img.icons8.com/ios-glyphs/20/000000/visible.png"
                  alt="icon"
                />
              </div>
            </div>
            <label htmlFor="signup-passwordConf" className="m-0 text-dark">
              {getConfirmPasswordOnRoutes}
            </label>
            <input
              type="password"
              id="signup-passwordConf"
              className="form-control form-control-lg form-control-a text-center password"
              autoComplete="current-password"
              value={passwordConf}
              onChange={handlePasswordConf}
              placeholder={getConfirmPasswordOnRoutes}
            />

            <button
              className="btn btn-hover color-3 my-4 mx-0 text-white"
              type="submit"
            >
              {!loading ? getSubmitButtonOnRoutes : <Loader></Loader>}
            </button>

            <p className="text-center">{getSignUpMethodOnRoutes}</p>
            <div className="login-list">
              <div onClick={firebase.signInWithGoogle}>
                <i className="fab fa-google fa-lg"></i>
              </div>
              {/* <img
                src="https://img.icons8.com/color/30/000000/weixing.png"
                className="px-1"
                alt="weixinsignin"
              /> */}
            </div>
            <p
              style={{
                alignSelf: "flex-end",
                textDecoration: "underline",
                cursor: "pointer",
                color: "blue",
              }}
              onClick={openLogin}
            >
              {getAlreadyUserOnRoutes}
            </p>
          </form>
        </div>
      </div>
      <div className="loginButton">
        <a className={`${linkColor || ""}`} onClick={openSignup}>
          {getLoginTextOnRoutes}
        </a>
      </div>
      <Login passwordReveal={passwordReveal} closeLogin={closeLogin}></Login>
    </>
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

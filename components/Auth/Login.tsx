import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import firebase from "../../firebase/firebase";
import Image from '../../public/image'
import {signIn} from '../../service'
import Loader from "../Loader/Loader";
// tslint:disable
const Login = ({
  passwordReveal,
  closeLogin,
}: {
  passwordReveal: any;
  closeLogin: (e: any) => {};
}) => {
  const router = useRouter();
  const LoginContainer = useRef(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState([]);
  const [loading, setloading] = useState(false);

  const openSignup = (_e: any) => {
    closeLogin(LoginContainer);
    const modalContainer = document.querySelector(".signup-container");
    modalContainer.classList.remove("out");
    modalContainer.classList.add("popup");
  };
  const clearInput = () => {
    setemail("");
    setpassword("");
    seterrors([]);
  };
  const handleCloseLogin = () => closeLogin(LoginContainer);
  const handleEmail = (e: any) => {
    setemail(e.target.value);
  };
  const handlePassword = (e: any) => {
    setpassword(e.target.value);
  };

  const handleUserSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      const shakeMessage = document.querySelector(".shake-target");
      shakeMessage.classList.toggle("shake-message");
      const error =
        router.pathname === "/zh"
          ? "填写全部信息"
          : "Fill all the requirements";

      return seterrors([error]);
    }
    try {
      if (!loading) {
        setloading(true);
        const user = await signIn ({
          email,
          password,
        });
        // console.log(response.data.userToSend);
        if (typeof window != "undefined") {
          window.localStorage.setItem("token", user.token);
        }

        router.reload();
        clearInput();
        closeLogin(LoginContainer);
      }
    } catch (error) {
      setloading(false);
      console.log(error.response.data);
      if (error.response.data) {
        const _error =
          router.pathname === "/"
            ? error.response.data.message
            : error.response.data.message_cn;
        seterrors(_error);
      }
      if (error.response.data.errors) {
        const _error = error.response.data.errors.map(
          (each) => `  ${each.msg}`
        );
        seterrors(_error);
      }
    }
  };
  const handleForgetPassword = async () => {
    console.log("forget pasword");
  };
  const getLoginNameOnRoutes = useMemo(
    () => (router.pathname == "/" ? "Log into your account" : "登录"),
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
  const getLoginButtonOnRoutes = useMemo(
    () => (router.pathname == "/" ? "Login" : "确定"),
    [router.pathname]
  );
  const getSignUpOnRoutes = useMemo(
    () => (router.pathname == "/" ? "I don't have an account" : "我要注册"),
    [router.pathname]
  );
  const getLoginMethodOnRoutes = useMemo(
    () =>
      router.pathname == "/" ? "or log in with:" : "或者使用以下方法登录:",
    [router.pathname]
  );
  const getForgetPasswordOnRoutes = useMemo(
    () => (router.pathname === "/" ? "Forget Password?" : "忘记密码?"),
    [router.pathname]
  );
  return (
    <>
      <div ref={LoginContainer} className="login-container">
        <div className="modal-background text-dark lazy-load shake-target card">
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
              <h5 className="py-3 mt-3">{getLoginNameOnRoutes}</h5>
              <span
                style={{ fontSize: "30px", cursor: "pointer" }}
                onClick={handleCloseLogin}
              >
                &#10005;
              </span>
            </div>
            {errors ? (
              <span className="text-danger error-div">{errors}</span>
            ) : null}
            <label htmlFor="login-email" className="m-0 text-dark">
              {getEmailOnRoutes}
            </label>
            <input
              type="email"
              id="login-email"
              className="form-control form-control-lg form-control-a text-center mb-4"
              autoComplete="email"
              value={email}
              onChange={handleEmail}
              placeholder={getEmailOnRoutes}
            />
            <label htmlFor="login-password" className="m-0 text-dark">
              {getPasswordOnRoutes}
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type="password"
                id="login-password"
                className="form-control form-control-lg form-control-a text-center password"
                autoComplete="current-password"
                value={password}
                onChange={handlePassword}
                placeholder={getPasswordOnRoutes}
              />
              <div onClick={passwordReveal} className="password-show">
                <Image
                  src="https://img.icons8.com/ios-glyphs/20/000000/visible.png"
                  alt="icon"
                />{" "}
              </div>
            </div>
            <span
              style={{
                alignSelf: "flex-end",
                textDecoration: "underline",
                cursor: "pointer",
                color: "blue",
              }}
              onClick={handleForgetPassword}
            >
              {/* {getForgetPasswordOnRoutes} */}
            </span>
            <button
              className="btn btn-hover color-3 my-4 mx-0 btn-block text-white"
              type="submit"
            >
              {!loading ? getLoginButtonOnRoutes : <Loader />}
            </button>

            <p className="text-center">{getLoginMethodOnRoutes}</p>
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
              onClick={openSignup}
            >
              {getSignUpOnRoutes}
            </p>
          </form>
        </div>
      </div>
    </>
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

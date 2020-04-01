import App from "next/app";
import firebase from "../firebase/firebase";
import api from "../utils/Api";
import { getCookie, setCookie, themeProvider } from "../utils/Cookie";
import Router from 'next/router'
class SamMainApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }
  state = {
    currentUser: ""
  };
  unsubscribeFromAuth = null;
  getUserProfile = async token => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token") || null;
    }

    if (!token) return;

    try {
      const response = await api.get("/api/users/profile", {
        headers: {
          "x-auth-token": token
        }
      });
      const data = await response.data;

      this.setState(state => {
        if (token) {
          process.env.NODE_ENV === "development"
            ? console.log("user", data)
            : null;
          return typeof token === "string" && { currentUser: data };
        }
      });
    } catch (error) {
      console.log("token faield");
      if(error){
        Router.reload()
      }
    }
  };

  handleTheme = () => {
    if (typeof window !== "undefined") {
      if (getCookie("theme") === "day") {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#333";
        return "day";
      } else if (getCookie("theme") === "night") {
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "#f1f7f5";
        return "night";
      } else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#333";
      }
    }
  };

  lightTheme = () => {
    setCookie("theme", "day", 365);
    console.log("day");
    if (typeof window !== "undefined") {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#333";
    }
  };
  darkTheme = () => {
    setCookie("theme", "night", 365);
    console.log("night");
    if (typeof window !== "undefined") {
      document.body.style.backgroundColor = "#333";
      document.body.style.color = "#fff";
    }
  };
  componentDidMount() {
    let user = window.localStorage.getItem("token") || null;
    let refresh = localStorage.getItem("refresh");
    this.handleTheme();
    if (!refresh) {
      this.getUserProfile(user);
    }
    this.unsubscribeFromAuth = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState(state => {
          return {
            currentUser: user
          };
        });
      }
      return process.env.NODE_ENV === "development"
        ? console.log("currentuser from google auth", user)
        : null;
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component
        {...this.state}
        {...pageProps}
        lightTheme={this.lightTheme}
        darkTheme={this.darkTheme}
        handleTheme={this.handleTheme}
        getUserProfile={this.getUserProfile}
      ></Component>
    );
  }
}

export default SamMainApp;

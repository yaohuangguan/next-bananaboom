import App from "next/app";
import firebase from "../firebase/firebase";
import api from "../utils/Api";
interface MyProps {
  Component: any;
  pageProps: any;
}
interface MyState {
  currentUser: "";
}
class SamMainApp extends App<MyProps, MyState> {
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

  unsubscribeFromAuth = null;
  getUserProfile = async token => {
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
      console.log('token faield')
    }
  };
  componentDidMount() {
   
    let user = window.localStorage.getItem("token") || null;
    let refresh = localStorage.getItem("refresh");
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

    return <Component {...this.state} {...pageProps}></Component>;
  }
}

export default SamMainApp;

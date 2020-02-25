import App from "next/app";
import firebase from "../firebase/firebase";
import { Provider } from "react-redux";
import withRedux from "../redux/withRedux";
import api from "../utils/Api";
import Router from "next/router";
interface MyProps {
  Component: any;
  pageProps: any;
  reduxStore: any;
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
      console.log("auth failed, please login");
    }
  };
  componentDidMount() {
    let user = window.localStorage.getItem("token") || null;
    this.getUserProfile(user);
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
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Component {...this.state} {...pageProps}></Component>
      </Provider>
    );
  }
}

export default withRedux(SamMainApp);


import App from "next/app";
import firebase from "../firebase/firebase";

class MyApp extends App {
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
    currentUser: "",
    token: ""
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = firebase.auth.onAuthStateChanged(user => {
      if(user){
        this.setState(state => {
          return {
            currentUser: user
          };
        });
      }
     return console.log("currentuser from google auth", user);
    });

    this.setState({ token: window.localStorage.getItem("token") || "" }
    );

    this.setState(
      {
        currentUser:
          JSON.parse(window.localStorage.getItem("currentUser")) || ""
      },()=>console.log(this.state.currentUser)
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...this.state} {...pageProps}></Component>;
  }
}

export default MyApp;

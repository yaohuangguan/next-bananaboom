import App from "next/app";
import firebase from "../firebase/firebase";
import { Provider } from "react-redux";
import withRedux from "../redux/withRedux";
interface MyProps {
  Component: any;
  pageProps: any;
  reduxStore: any;
}
interface MyState {
  currentUser: "";
  token: "";
}
class MyApp extends App<MyProps, MyState> {
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

  componentDidMount() {
    this.unsubscribeFromAuth = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState(state => {
          return {
            currentUser: user
          };
        });
      }
      return console.log("currentuser from google auth", user);
    });

    this.setState({ token: window.localStorage.getItem("token") || "" });

    this.setState(
      {
        currentUser:
          JSON.parse(window.localStorage.getItem("currentUser")) || ""
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Provider store={reduxStore}>
        <Component {...this.state} {...pageProps}></Component>;
      </Provider>
    );
  }
}

export default withRedux(MyApp);

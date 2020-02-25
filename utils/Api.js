import axios from "axios";
import Router from "next/router";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nextbananaboom.herokuapp.com"
    : "http://localhost:5000";
const _api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

_api.interceptors.request.use(
  config => {
    _api.defaults.headers.common["X-XSS-Protection"] = 1;
    _api.defaults.headers.common["X-Content-Type-Options"] = "nosniff";
    _api.defaults.headers.common["Referrer-Policy"] = "same-origin";
    _api.defaults.headers.common["X-Frame-Options"] = "Deny";
    if (typeof window !== "undefined") {
      let token = window.localStorage.getItem("token");

      if (token) {
        _api.defaults.headers.common["x-auth-token"] = token;
      }
    }

    return config;
  },

  error => Promise.reject(error)
);

_api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (localStorage.getItem("refresh") != "1") {
            Router.reload();
            localStorage.setItem("refresh", "1");
          }

          break;
        case 400:
          throw error;
        case 403:
          throw error;
        case 404:
          console.log("the resources you requested does not exist");
          break;
        default:
          throw error;
      }
      return Promise.reject(error);
    }
  }
);
const source = axios.CancelToken.source();
_api.source = source;
export default _api;

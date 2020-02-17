import axios from "axios";
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


_api.defaults.timeout = 10000;
_api.interceptors.request.use(
  config => {
    _api.defaults.headers.common["X-XSS-Protection"] = 1;
    _api.defaults.headers.common["X-Content-Type-Options"] = "nosniff";
    _api.defaults.headers.common["Referrer-Policy"] = "same-origin";
    _api.defaults.headers.common["X-Frame-Options"] = "Deny";
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
          console.log("401");
          break;
        case 400:
          throw error;
        case 404:
          console.log("404");
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

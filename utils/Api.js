import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://nextbananaboom.herokuapp.com"
    : "https://nextbananaboom.herokuapp.com";

const _api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
_api.defaults.timeout = 20000;
_api.interceptors.request.use(
  (config) => {
    _api.defaults.headers.common["X-XSS-Protection"] = 1;
    _api.defaults.headers.common["X-Content-Type-Options"] = "nosniff";
    _api.defaults.headers.common["Referrer-Policy"] = "same-origin";
    _api.defaults.headers.common["X-Frame-Options"] = "Deny";
    if (typeof window !== "undefined") {
      localStorage.removeItem("refresh");
      let token = localStorage.getItem("token");
      if (token) {
        _api.defaults.headers.common["x-auth-token"] = token;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

_api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log("401 error");

          localStorage.setItem("refresh", true);

          throw error;
        case 400:
          throw error;
        case 403:
          throw error;
        case 404:
          console.log(
            "Interceptor 404 the resources you requested does not exist"
          );
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

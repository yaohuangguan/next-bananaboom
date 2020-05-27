import api from "./utils/Api";
import Axios from "axios";

const cancelToken = Axios.CancelToken.source();

export const get = (url, data = "", headers = {}) =>
  api(url, {
    headers: {
      ...headers,
    },
    cancelToken: cancelToken.token,
    data,
    method: "GET",
  }).then((res) => res.data)
    .catch((err) => Promise.reject(err))
    

export const post = (url, data = "", headers = {}) =>
  api(url, {
    headers: {
      ...headers,
    },
    cancelToken: cancelToken.token,
    data: JSON.stringify(data),

    method: "POST",
  })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));

export const put = (url, data = "", headers = {}) =>
  api(url, {
    headers: {
      ...headers,
    },
    data: JSON.stringify(data),

    cancelToken: cancelToken.token,
    method: "PUT",
  })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
export const del = (url, data = "", headers = {}) =>
  api(url, {
    headers: {
      ...headers,
    },
    data: JSON.stringify(data),

    cancelToken: cancelToken.token,
    method: "DELETE",
  })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));

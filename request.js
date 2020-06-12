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
  })
    .catch((err) => Promise.reject(err))
    .then((res) => {
      return res.status === 200 ? res.data : Promise.reject("status !== 200");
    });

export const post = (url, data = "", headers = {}) =>
  api(url, {
    headers: {
      ...headers,
    },
    cancelToken: cancelToken.token,
    data: data && JSON.stringify(data),

    method: "POST",
  })
    .catch((err) => Promise.reject(err))
    .then((res) => res.data);

export const put = (url, data = "", headers = {}) =>
  api(url, {
    headers: {
      ...headers,
    },
    data: data && JSON.stringify(data),

    cancelToken: cancelToken.token,
    method: "PUT",
  })
    .catch((err) => Promise.reject(err))
    .then((res) => res.data);

export const del = (url, data = "", headers = {}) =>
  api(url, {
    headers: {
      ...headers,
    },
    data: data && JSON.stringify(data),

    cancelToken: cancelToken.token,
    method: "DELETE",
  })
    .catch((err) => Promise.reject(err))
    .then((res) => res.data);

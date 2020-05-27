import { get, post, put, del } from "./request";
export const getBlogContent = (id) => get(`/api/posts/${id}`);
export const getBlogList = () => get(`/api/posts`);
export const getCommentList = (id) => get(`/api/comments/${id}`);
export const changeUserName = (id, data) =>
  post(`/api/users/changeusername/${id}`, data);
export const getResumeList = () => get("/api/resume");
export const getPrivatePosts = (data) => get("/api/posts/private/posts", data);
export const getHomepage = () => get("/api/homepage");
export const getLogs = () => get("/api/homepage/logs");
export const getProjects = () => get("/api/homepage/projects");
export const subscribeNewUser = (data) => post("/api/auth/subscribe", data);
export const addNewTodo = (data) => post("/api/todo", data);
export const getTodo = () => get("/api/todo");
export const finishTodo = (id) => post(`/api/todo/done/${id}`);
export const likeHomepage = (id, action) =>
  post(`/api/homepage/likes/${id}/${action}`);

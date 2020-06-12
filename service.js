import { get, post, put, del } from "./request";
export const getBlogContent = (id) => get(`/api/posts/${id}`);
export const getBlogList = () => get(`/api/posts`);
export const getCommentList = (id) => get(`/api/comments/${id}`);
export const changeUserName = (id, data) =>
  post(`/api/users/changeusername/${id}`, data);
export const getResumeList = () => get("/api/resume");
export const getPrivatePosts = (data) => get("/api/posts/private/posts", data);
export const CreateNewPost = (data) => post(`/api/posts`, data);
export const deletePost = id => del(`/api/posts/${id}`)
export const getHomepage = () => get("/api/homepage");
export const getLogs = () => get("/api/homepage/logs");
export const getProjects = () => get("/api/homepage/projects");
export const subscribeNewUser = (data) => post("/api/auth/subscribe", data);
export const addNewTodo = (data) => post("/api/todo", data);
export const getTodo = () => get("/api/todo");
export const finishTodo = (id) => post(`/api/todo/done/${id}`);
export const likeHomepage = (id, action) =>
  post(`/api/homepage/likes/${id}/${action}`);

export const signIn = (data) => post("/api/users/signin", data);
export const signUp = (data) => post("/api/users", data);
export const getEmojiList = (text) =>
  get(`https://emoji.getdango.com/api/emoji?q=${text}`);
export const getNewComments = (id) => get(`/api/comments/${id}`);
export const postNewComments = (id, currentUser, data, headers) =>
  post(`/api/comments/${id}?user_id=${currentUser._id}`, data, headers);
export const getCommentReply = (id) => get(`/api/comments/reply/${id}`);
export const postCommentReply = (comment_id, data, headers) =>
  post(`/api/comments/reply/${comment_id}`, data, headers);

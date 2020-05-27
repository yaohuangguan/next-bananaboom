import api from "./utils/Api";
export const getBlogContent = (id) => api(`/api/posts/${id}`);
export const getBlogList = () => api(`/api/posts`);
export const getCommentList = (id) => api(`/api/comments/${id}`);
export const changeUserName = (id, data) =>
  api.post(`/api/users/changeusername/${id}`, data);
export const getResumeList = () => api("/api/resume");

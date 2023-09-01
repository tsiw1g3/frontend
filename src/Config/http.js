import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("loginToken");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: token,
    };
  }
  return Promise.resolve(config);
});

export default api;

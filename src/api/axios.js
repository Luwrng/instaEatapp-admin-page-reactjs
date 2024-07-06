import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://instaeat.azurewebsites.net/api",
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;

import axios from "axios";

import { useUtil } from "@/composables";
import type { ILoginResponse, IUserResponse, LoginInput } from "@/interfaces";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

// interceptores
// request
authApi.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = window.localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response
authApi.interceptors.response.use(
  (response) => {
    return {
      ...response.data,
      status: response.status,
    };
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes("not logged in") && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessTokenFn();
      return authApi(originalRequest);
    }

    if (error.response) {
      const util = useUtil();
      const {
        data: { statusCode: status, message },
      } = error.response;
      if (status !== 401) {
        util.showAlert({
          severity: "error",
          detail: message,
          summary: "Error",
        });
      } else {
        document.location.href = '/authenticate/login'
      }
    }
    return Promise.reject(error);
  }
);

// functions
// refresh Token
const refreshAccessTokenFn = async () => {
  return await authApi.get<ILoginResponse>("auth/refresh");
};

// login
export const login = async (user: LoginInput) => {
  return await authApi.post<ILoginResponse>("auth/login", user);
};

// me
export const getMe = async () => {
  return await authApi.get<IUserResponse>("users/me");
};

export { authApi };

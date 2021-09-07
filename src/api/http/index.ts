import axios, { AxiosError, AxiosResponse } from "axios";
import { authService } from "services/auth-service";
import { AxiosRequestConfigCustom } from "./types";

const host = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

const authHeader = (): { Authorization: string } => {
  const accessToken = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${accessToken && accessToken.replace(/[[\]"]+/g, "")}` };
};

export const get = async (url: string, config?: AxiosRequestConfigCustom): Promise<AxiosResponse> => {
  return axios.get(`${host}${url}`, config);
};

export const post = async (url: string, data?: any, config?: AxiosRequestConfigCustom): Promise<AxiosResponse> => {
  return axios.post(`${host}${url}`, data, config);
};

export const patch = async (url: string, data?: any, config?: AxiosRequestConfigCustom): Promise<AxiosResponse> => {
  return axios.patch(`${host}${url}`, data, config);
};

const authInterceptor = (config: AxiosRequestConfigCustom) => {
  return { ...config, headers: authHeader() };
};

axios.interceptors.request.use(authInterceptor);

axios.interceptors.response.use(undefined, async (err: AxiosError) => {
  if (err.response?.status === 401) {
    const refresh_token = localStorage.getItem("refresh_token");
    if (refresh_token) {
      try {
        await authService.refreshTokenFx({ refresh_token: refresh_token.replace(/[[\]"]+/g, "") });
        return axios.request(err.config);
      } catch (e) {
        return Promise.reject(err);
      }
    }
  }
  return Promise.reject(err);
});

import { AxiosRequestConfig } from "axios";

export type JWT = {
  login: string;
  name: string;
  iat: number;
  exp: number;
};

export type AxiosRequestConfigCustom = AxiosRequestConfig & { needAuth?: boolean };

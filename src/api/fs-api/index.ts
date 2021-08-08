import axios from "axios";
import { GetFsRequest, GetFsResponse } from "./type";
export * from "./type";
import { host } from "../index";

export const fsApi = {
  getFs: async (data: GetFsRequest): Promise<GetFsResponse> => {
    const res = await axios.get(`${host}/${data.path}`);
    return res.data;
  },
};

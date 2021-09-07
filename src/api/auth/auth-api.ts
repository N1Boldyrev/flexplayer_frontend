import { AuthRequest, AuthResponse, RefreshResponse, RefreshRequest } from "api/auth/types";
import { get, post } from "api/http";

export const authApi = {
  auth: async (data: AuthRequest): Promise<AuthResponse> => {
    const res = await get("/auth", { params: { login: data.login, password: data.password } });
    return res.data;
  },
  checkToken: async () => get("/auth/check", { needAuth: true }),

  refreshToken: async (data: RefreshRequest): Promise<RefreshResponse> => {
    const res = await post("/auth", { refresh_token: data.refresh_token });
    return res.data;
  },
};

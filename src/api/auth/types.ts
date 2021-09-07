export type AuthRequest = {
  login: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export type RefreshRequest = {
  refresh_token: string | null;
};

export type RefreshResponse = {
  access_token: string;
  refresh_token: string;
};

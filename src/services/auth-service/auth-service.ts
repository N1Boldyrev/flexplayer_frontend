import { createReEffectFactory } from "effector-reeffect";
import { AxiosError } from "axios";
import { combine, createDomain, sample, forward } from "effector";
import { createGate } from "effector-react";
import { persist as localStorage } from "effector-storage/local";
import { persist as sessionStorage } from "effector-storage/session";
import { authApi, AuthRequest, AuthResponse, RefreshRequest, RefreshResponse } from "api/auth";

const authDomain = createDomain("auth domain");
const createReEffect = createReEffectFactory(authDomain.createEffect);
const gate = createGate({ domain: authDomain });

const authFx = createReEffect<AuthRequest, AuthResponse, AxiosError>({ handler: authApi.auth });
const checkTokenFx = createReEffect({ handler: authApi.checkToken });
const refreshTokenFx = createReEffect<RefreshRequest, RefreshResponse, AxiosError>({ handler: authApi.refreshToken });

forward({ from: gate.open, to: checkTokenFx });

const setAuth = authDomain.createEvent<boolean>();
const logout = authDomain.createEvent();
const refreshToken = authDomain.createEvent();
const setAuthChecked = authDomain.createEvent();

const $authChecked = authDomain.createStore(false);
$authChecked.on(setAuthChecked, () => true);

forward({ from: [checkTokenFx.doneData, checkTokenFx.failData], to: setAuthChecked });

const $isAuth = authDomain.createStore(false);
$isAuth.reset(logout);
$isAuth.on(setAuth, (_, setter) => setter);
$isAuth.on(refreshTokenFx.failData, () => false);

const $accessToken = authDomain.createStore<string | null>(null);
$accessToken.reset(logout);
const $refreshToken = authDomain.createStore<string | null>(null);
$refreshToken.reset(logout);

sample({
  source: authFx.doneData,
  fn: (tokens): string => tokens.access_token,
  target: [$accessToken, setAuth.prepend(() => true)],
});

sample({
  source: authFx.doneData,
  fn: (tokens): string => tokens.refresh_token,
  target: $refreshToken,
});

sample({
  source: checkTokenFx.doneData,
  target: setAuth.prepend(() => true),
});

sample({
  source: $refreshToken,
  clock: refreshToken,
  fn: (refreshToken): RefreshRequest => ({ refresh_token: refreshToken }),
  target: refreshTokenFx,
});

sample({
  source: refreshTokenFx.doneData,
  fn: (tokens): string => tokens.access_token,
  target: [$accessToken],
});

sample({
  source: refreshTokenFx.doneData,
  fn: (tokens): string => tokens.refresh_token,
  target: $refreshToken,
});

localStorage({ store: $accessToken, key: "access_token" });
localStorage({ store: $refreshToken, key: "refresh_token" });

sessionStorage({ store: $accessToken, key: "access_token" });
sessionStorage({ store: $refreshToken, key: "refresh_token" });

export const authService = {
  authFx,
  authGate: gate,
  logout,
  refreshToken,
  refreshTokenFx,
  $store: combine({
    isAuth: $isAuth,
    authChecked: $authChecked,
    pending: authFx.pending,
  }),
};

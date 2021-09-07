import { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useStore } from "effector-react";
import { Route as RouteT } from "./types";
import { authService } from "services/auth-service";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const TitlesPage = lazy(() => import("../pages/TitlesPage"));

const notAuth: RouteT[] = [{ path: "/login", component: <LoginPage /> }];

const auth: RouteT[] = [
  { path: "/titles", component: <TitlesPage /> },
  { path: "/kek", component: <TitlesPage /> },
];

export const Router = () => {
  const { $store } = authService;
  const { isAuth } = useStore($store);

  return (
    <BrowserRouter>
      {!isAuth && (
        <Switch>
          {notAuth.map((route) => (
            <Route path={route.path} key={route.path}>
              <Suspense
                fallback={
                  <div>
                    <></>
                  </div>
                }
              >
                {route.component}
              </Suspense>
            </Route>
          ))}
          <Redirect to={"/login"} />
        </Switch>
      )}
      {isAuth && (
        <Switch>
          {auth.map((route) => (
            <Route path={route.path} key={route.path}>
              <Suspense
                fallback={
                  <div>
                    <></>
                  </div>
                }
              >
                {route.component}
              </Suspense>
            </Route>
          ))}
          <Redirect to={"/titles"} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

import React from "react";
import { exactRoute } from "../models/router-model/router-model";
import { useRoute } from "trace-router-react";
import { MainPage } from "../pages/Main";

export const App = () => {
  return <>{useRoute(exactRoute) && <MainPage />}</>;
};

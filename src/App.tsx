import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.scss";
import { useGate, useStore } from "effector-react";
import { authService } from "services/auth-service";
import { Router } from "router";

export const App = () => {
  const { authGate, $store } = authService;
  useGate(authGate);
  const { authChecked } = useStore($store);
  return (
    <>
      {authChecked && <Router />}
      <ToastContainer />
    </>
  );
};

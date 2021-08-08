import React from "react";
import { useGate, useStore } from "effector-react";
import { fsModel } from "../../models/fs-model";
import { PathType } from "../../api/fs-api";
import { WizardPage } from "../Wizard";
import { VideoPage } from "../Video";
import { history } from "../../models/router-model/router-model";

export const MainPage = () => {
  const { fsGate, $store } = fsModel;
  const { pageType } = useStore($store);
  useGate(fsGate, history.location.pathname);
  return (
    <>
      <div>
        {pageType === PathType.DIR && <WizardPage />}
        {pageType === PathType.FILE && <VideoPage />}
      </div>
    </>
  );
};

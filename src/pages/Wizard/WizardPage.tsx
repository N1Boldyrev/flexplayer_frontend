import React from "react";
import { useStore } from "effector-react";
import { fsModel } from "../../models/fs-model";
import { history } from "../../models/router-model/router-model";

export const WizardPage = () => {
  const { $store } = fsModel;
  const { fs } = useStore($store);
  return (
    <div>
      {fs?.innerFiles?.map((file) => (
        <div>
          <a
            href={history.location.pathname === "/" ? file.name : `${history.location.pathname}/${file.name}`}
            key={file.name}
          >
            {file.name}
          </a>
        </div>
      ))}
    </div>
  );
};

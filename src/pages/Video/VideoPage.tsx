import React from "react";
import { useStore } from "effector-react";
import { fsModel } from "../../models/fs-model";
import { host } from "../../api";

export const VideoPage = () => {
  const { $store } = fsModel;
  const { videoUrl } = useStore($store);
  return <div>{videoUrl && <video src={`${host}/${videoUrl}`} />}</div>;
};

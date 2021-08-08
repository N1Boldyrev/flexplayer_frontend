import { combine, createDomain, sample } from "effector";
import { createGate } from "effector-react";
import { createReEffect } from "effector-reeffect";
import { fsApi, GetFsRequest, GetFsResponse, PathType } from "../../api/fs-api";
import { history } from "../router-model/router-model";

const getFsFx = createReEffect<GetFsRequest, GetFsResponse, any>({ handler: fsApi.getFs });

const fsDomain = createDomain("fs domain");
const gate = createGate<string>({ domain: fsDomain });

const $fs = fsDomain.createStore<GetFsResponse | null>(null);
$fs.on(getFsFx.doneData, (_, data) => data);

const $pageType = fsDomain.createStore<PathType>(PathType.DIR);
$pageType.on(getFsFx.doneData, (_, data) => data.currentPathType);

const $videoUrl = fsDomain.createStore<string | null>(null);
$videoUrl.on(getFsFx.doneData, (_, data) => data.fileUrl);

sample({
  source: gate.state,
  fn: (path): GetFsRequest => ({ path: `fs${path}` }),
  target: getFsFx,
});

gate.open.watch(() => console.log("gate open"));
gate.close.watch(() => console.log("gate close"));

getFsFx.fail.watch((error) => {
  if (error.error.response.status === 404) history.push("/");
});

export const fsModel = {
  $store: combine({
    fs: $fs,
    pageType: $pageType,
    getFsPending: getFsFx.pending,
    videoUrl: $videoUrl,
  }),
  fsGate: gate,
};

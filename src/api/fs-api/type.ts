export type GetFsRequest = {
  path: string;
};

export enum PathType {
  FILE = "FILE",
  DIR = "DIR",
}

export type File = {
  name: string;
  extension?: string;
};

export type GetFsResponse = {
  currentPathType: PathType;
  innerFiles?: File[];
  fileUrl?: string;
};

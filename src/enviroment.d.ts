declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_PROTOCOL: string;
      REACT_APP_HOST: string;
      REACT_APP_PORT: string;
    }
  }
}

export {};

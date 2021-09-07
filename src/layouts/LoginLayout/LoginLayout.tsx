import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface LoginLayoutProps {
  children: ReactNode;
}

export const LoginLayout = (props: LoginLayoutProps) => {
  const { children } = props;

  return <div className={styles.loginLayout}>{children}</div>;
};

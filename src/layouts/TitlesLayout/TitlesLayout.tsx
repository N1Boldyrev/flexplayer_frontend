import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Header } from "ui/Header";

interface TitlesLayoutProps {
  children?: ReactNode;
}

export const TitlesLayout = (props: TitlesLayoutProps) => {
  const { children } = props;

  return (
    <div className={styles.mainLayout}>
      <Header />
      {children}
    </div>
  );
};

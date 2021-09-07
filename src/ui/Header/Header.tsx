import styles from "./styles.module.scss";
import { ReactComponent as Logo } from "assets/logo.svg";
import { authService } from "services/auth-service";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <button onClick={() => authService.logout()}>logout</button>
    </header>
  );
};

import React from "react";
import { useForm } from "effector-forms";
import { useGate } from "effector-react";
import styles from "./styles.module.scss";
import { Input } from "ui/Input";
import { Button } from "ui/Button";
import { loginService } from "services/login-service";
import { ReactComponent as LoginIcon } from "assets/login.svg";
import { ReactComponent as PasswordIcon } from "assets/password.svg";
import { ReactComponent as Logo } from "assets/logo.svg";

export const LoginForm = () => {
  const { loginGate, loginForm } = loginService;
  useGate(loginGate);
  const { fields, submit } = useForm(loginForm);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <form className={styles.loginForm} onSubmit={(e) => onSubmitHandler(e)}>
      <div>
        <Logo />
      </div>
      <div className={styles.container}>
        <Input
          rightAdornment={<LoginIcon />}
          label={"Login"}
          value={fields.login.value}
          onChange={fields.login.onChange}
          error={fields.login.hasError()}
          helperText={fields.login.errorText()}
        />
      </div>
      <div className={styles.container}>
        <Input
          rightAdornment={<PasswordIcon />}
          label={"Password"}
          type={"password"}
          value={fields.password.value}
          onChange={fields.password.onChange}
          error={fields.password.hasError()}
          helperText={fields.password.errorText()}
        />
      </div>
      <div className={styles.container}>
        <Button type={"submit"}>Sign In</Button>
      </div>
    </form>
  );
};

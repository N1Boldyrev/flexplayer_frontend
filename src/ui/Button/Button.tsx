import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  type?: "submit" | "reset";
  style?: CSSProperties;
  variant?: "dark" | "light";
}

export const Button = (props: ButtonProps) => {
  const { onClick, disabled, children, type, variant = "dark", style } = props;

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => (onClick ? onClick() : null)}
        className={`${styles.button} ${disabled && styles.disabled} ${variant === "light" && styles.light} ${
          variant === "dark" && styles.dark
        }`}
        type={type}
        style={style}
      >
        {children}
      </button>
    </>
  );
};

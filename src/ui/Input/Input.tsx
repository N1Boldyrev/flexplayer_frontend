import React, { ReactNode, useState, useRef, useEffect, CSSProperties } from "react";
import styles from "./styles.module.scss";

interface InputProps {
  type?: "text" | "password";
  value: string;
  onChange?: (value: string) => void;
  rightAdornment?: ReactNode;
  label?: string;
  error?: boolean;
  helperText?: string;
  variant?: "dark" | "light";
  style?: CSSProperties;
}

export const Input = (props: InputProps) => {
  const { type = "text", value, onChange, rightAdornment, label, error, helperText, variant = "dark", style } = props;

  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value === "" && document.activeElement !== inputRef.current) setFocused(false);
    else setFocused(true);
  }, [value]);

  const onChangeHandler = (value: string) => {
    if (onChange) {
      onChange(value);
      if (value) {
        setFocused(true);
      }
    }
  };

  return (
    <div
      className={`${styles.wrapper} ${variant === "dark" && styles.dark} ${variant === "light" && styles.light}`}
      style={style}
    >
      <div
        className={`${styles.inputWrap} ${focused && styles.focused} ${error && styles.error} ${
          rightAdornment && styles.rightAdornment
        }`}
      >
        {label && (
          <div className={styles.label} onClick={() => inputRef.current?.focus()}>
            {label}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChangeHandler(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(!!value)}
          ref={inputRef}
          autoComplete="new-password"
        />
        {rightAdornment && <div className={styles.adornment}>{rightAdornment}</div>}
      </div>
      <div className={`${styles.helperText} ${error && styles.error}`}>{helperText && helperText}</div>
    </div>
  );
};

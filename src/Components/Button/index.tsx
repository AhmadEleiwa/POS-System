import React, { FC, MouseEventHandler, PropsWithChildren } from "react";
import useTheme from "../../context/Theme/useTheme";
import style from "./style.module.css";
interface props extends PropsWithChildren {
  variant?: "primary" | "secondary" | "warning" | "error";
  size?: "large" | "normal";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  fullWidth?: boolean;
  className?:string;
}
const Button: FC<props> = ({
  children,
  variant = "primary",
  size = "normal",
  onClick,
  fullWidth = false,
  className
}) => {
  const theme = useTheme();
  const styles = {
    backgroundColor: "",
    width: "auto",
    padding: "0.7em 1em",
    color: theme.palette.textAction,
    boxShadow: " 0 2px 4px" + theme.palette.shadow,
  };
  if (variant === "primary") styles.backgroundColor = theme.palette.primary;
  else if (variant === "secondary")
    styles.backgroundColor = theme.palette.secondary;
  else if (variant === "error") styles.backgroundColor = theme.palette.error;
  else if (variant === "warning")
    styles.backgroundColor = theme.palette.warning;

  if (size === "large") styles.padding = "1em 2em";
  else styles.padding = "0.7em 1em";
  if (fullWidth) styles.width = "100%";
  return (
    <button className={style.btn +" " + className} onClick={onClick} style={styles}>
      {children}
    </button>
  );
};

export default Button;

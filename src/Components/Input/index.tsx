import { ChangeEventHandler, FC } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";

interface props {
  placeholder?: string;
  width?: string;
  color?: string;
  type?: string;
  id?: string;
  value?: string | number;
  name?: string;
  onChange: ChangeEventHandler;
}
const Input: FC<props> = ({
  placeholder,
  width,
  color,
  type = "text",
  id,
  name,
  value,
  onChange,
}) => {
  const theme = useTheme();
  return (
    <input
      style={{
        width: width ? width : "18em",
        border: `1px solid ${color ? color : theme.palette.secondary}`,
        backgroundColor: theme.palette.paper,
        color: theme.palette.textPrimary,
      }}
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={style.input}
    />
  );
};

export default Input;

import { ChangeEventHandler, FC } from "react";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import { useField } from "formik";
interface props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  width?: string;
  color?: string;
  value?: string;
  type?: string;
  id?: string;
  name: string;
  className?: string;
}
const TextField: FC<props> = ({
  onChange,
  placeholder,
  className,
  width,
  color,
  value,
  type = "text",
  id,
  name,
}) => {
  const [field, meta] = useField(name)
  const theme = useTheme();
  return (
    <>
    <input
      style={{
        width: width ? width : "18em",
        border: meta.error
          ? "1px solid" + theme.palette.error
          : `1px solid ${color ? color : theme.palette.secondary}`,
        backgroundColor: meta.error
          ? theme.palette.error + "33"
          : theme.palette.paper,
        color: theme.palette.textPrimary,
      }}
      
      name={name}
      id={id}
      type={type}
      value={field.value}
      onChange={field.onChange}
      placeholder={placeholder}
      className={style.input}
    />
    {meta.error && <p style={{color:theme.palette.error, fontSize:14}}>{meta.error}</p>}
  </>
  );
};

export default TextField;

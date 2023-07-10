import React, { FC } from "react";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import useTheme from "../../context/Theme/useTheme";

import { useField } from "formik";
interface props {
  options: { key: string; value: string }[];
  width?:string;
  name:string;
}
const SelectField: FC<props> = ({ options,width ,name}) => {
  const [field] = useField(name)
  const theme = useTheme();
  return (
    <div
      className={style.select}
      style={{
        border: "1px solid" + theme.palette.secondary,
        backgroundColor: theme.palette.paper,
        width:width
      }}
    >
      <select
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        className={style.select}
        style={{ color: theme.palette.textPrimary }}
      >
        {options.map((op) => (
          <option
            key={op.key}
            value={op.key}
            style={{ backgroundColor: theme.palette.paper }}
          >
            {op.value}
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={faArrowDown}
        className={style.arrowIcon}
        color={theme.palette.textPrimary}
      />
    </div>
  );
};

export default SelectField;

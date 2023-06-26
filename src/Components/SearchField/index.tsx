import React, { FC, createRef, useRef, useState } from "react";
import useTheme from "../../context/Theme/useTheme";
import style from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";
import { ChangeEventHandler } from "react";

interface props {
  onChange?: (x: string) => void;
  width?: string;
  className?: string;
  color?: string;
}
const SearchField: FC<props> = ({
  onChange,
  width,
  className,
  color = undefined,
}) => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };
  const resetHandler = () => {
    setSearchValue("");

    if (onChange) onChange("");
  };
  return (
    <div
      className={style.searchInput + " " + className}
      style={{
        width: width ? width : "18em",
        border: `1px solid ${color ? color : theme.palette.secondary}`,
        backgroundColor: theme.palette.paper,
      }}
    >
      <FontAwesomeIcon
        color={theme.palette.textSecondary}
        className={style.searchIcon}
        icon={faMagnifyingGlass}
      />
      <input
        placeholder="Search"
        onChange={onChangeHandler}
        value={searchValue}
        style={{ color: theme.palette.textPrimary }}
      />
      {searchValue !== "" && (
        <FontAwesomeIcon
          color={theme.palette.textSecondary}
          onClick={resetHandler}
          className={style.searchIcon}
          data-testid="reset-icon"
          icon={faXmark}
        />
      )}
    </div>
  );
};
export default SearchField;

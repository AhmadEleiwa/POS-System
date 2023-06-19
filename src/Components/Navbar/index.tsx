import React, { FC } from "react";
import useTheme from "../../context/Theme/useTheme";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGauge,
  faTable,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import style from "./style.module.css";
const Navbar: FC = () => {
  const theme = useTheme();
  return (
    <header
      className={style.header}
      style={{ backgroundColor: theme.palette.primary }}
    >
      <FontAwesomeIcon
        onClick={() => {
          theme.changePalette("green");
        }}
        className={style.link}
        icon={faBars}
        color="white"
      />
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faUser} color="white" />
      </Link>
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faTable} color="white" />
      </Link>
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faGauge} color="white" />
      </Link>
    </header>
  );
};
export default Navbar;

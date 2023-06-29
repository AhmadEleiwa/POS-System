import React, { FC } from "react";
import useTheme from "../../context/Theme/useTheme";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCube,
  faGauge,
  faGears,
  faRuler,
  faTable,
  faTag,
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
          theme.changePalette("primary");
        }}
        className={style.link}
        icon={faBars}
        color="white"
      />
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faUser} color="white" />
      </Link>
      <Link to={"/category"}>
        <FontAwesomeIcon className={style.link} icon={faTag} color="white" />
      </Link>
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faRuler} color="white" />
      </Link>
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faCube} color="white" />
      </Link>
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faGears} color="white" />
      </Link>
    </header>
  );
};
export default Navbar;

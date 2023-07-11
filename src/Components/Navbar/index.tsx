import React, { FC } from "react";
import useTheme from "../../context/Theme/useTheme";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faGears,
  faHome,
  faRuler,
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
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faHome} color="white" />
      </Link>
      <Link to={"/"}>
        <FontAwesomeIcon className={style.link} icon={faUser} color="white" />
      </Link>
      <Link to={"/category"}>
        <FontAwesomeIcon className={style.link} icon={faTag} color="white" />
      </Link>
      <Link to={"/unit-measure"}>
        <FontAwesomeIcon className={style.link} icon={faRuler} color="white" />
      </Link>
      <Link to={"/product"}>
        <FontAwesomeIcon className={style.link} icon={faCube} color="white" />
      </Link>
      <Link to={"/dashboard"}>
        <FontAwesomeIcon className={style.link} icon={faGears} color="white" />
      </Link>
    </header>
  );
};
export default Navbar;

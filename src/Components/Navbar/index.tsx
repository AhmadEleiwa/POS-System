import React, { FC } from "react";
import useTheme from "../../context/Theme/useTheme";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faGears,
  faHome,
  faRuler,
  faSignOut,
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
      <Link to={"/"} title="home">
        <FontAwesomeIcon className={style.link} icon={faHome} color="white" />
      </Link>
      <Link to={"/auth"} title="login">
        <FontAwesomeIcon className={style.link} icon={faUser} color="white" />
      </Link>
      <Link to={"/category"}  title="category">
        <FontAwesomeIcon className={style.link} icon={faTag} color="white" />
      </Link>
      <Link to={"/unit-measure"}  title="unit of measure">
        <FontAwesomeIcon className={style.link} icon={faRuler} color="white" />
      </Link>
      <Link to={"/product"}  title="product">
        <FontAwesomeIcon className={style.link} icon={faCube} color="white" />
      </Link>
      <Link to={"/dashboard"} title="dashboard">
        <FontAwesomeIcon className={style.link} icon={faGears} color="white" />
      </Link>
      <Link to={"/logout"} title="logout">
        <FontAwesomeIcon className={style.link} icon={faSignOut} color="white" />
      </Link>
    </header>
  );
};
export default Navbar;

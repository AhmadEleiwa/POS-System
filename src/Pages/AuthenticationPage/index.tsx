import { Form, Formik } from "formik";
import React, { FC } from "react";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import { userSchema } from "../../schema";
import useSnackbar from "../../context/Snackbar/useSnackbar";
/**
 * ## Authentication Page
 * Authentication page the page that allow the exist user to login into the site.
 * Only admin can add user through the admin dashboard.
 */
const AuthenticationPage: FC = () => {
  const snack = useSnackbar();

  const [, setCookies] = useCookies();
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <div className={style.container}>
      <Formik
        onSubmit={(values) => {
          axios
            .post("http://localhost:5500/user/login", {
              username: values.username,
              password: values.password,
            })
            .then((res) => {
              snack.onResponse({
                message: "hello !",
                status: 201,
              });
              setCookies("auth", res.data, {
                expires: new Date(Date.now() + 7200 * 1000),
              });
              axios.defaults.headers.post.Authorization =
                "barear " + res.data.token;
              console.log(axios.defaults.headers.post.Authorization);
              navigate("/");
            })
            .catch((err) => {
              snack.onResponse({
                message: err.response.data.message,
                status: err.response.status,
              });
            });
        }}
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={userSchema}
      >
        <Form
          className={style.form}
          style={{
            boxShadow: "0 2px 8px" + theme.palette.shadow,
            backgroundColor: theme.palette.paper,
            color: theme.palette.textPrimary,
          }}
        >
          <h1>LOGIN</h1>
          <label htmlFor="username">Username</label>
          <TextField name="username" width="80%" placeholder="Enter Username" />
          <label htmlFor="password">Password</label>
          <TextField
            name="password"
            width="80%"
            type="password"
            placeholder="Enter Password"
          />
          <Button type="submit">Login</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AuthenticationPage;

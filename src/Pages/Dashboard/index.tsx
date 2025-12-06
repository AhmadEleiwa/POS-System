import React, { FC, useEffect, useState } from "react";
import Select from "../../Components/Select";
import useTheme from "../../context/Theme/useTheme";
import { keys } from "../../context/Theme/Palettes";
import CartTable from "../../Components/CartTable";
import style from "./style.module.css";
import { useCookies } from "react-cookie";
import UserRow from "./UserRow";
import { Form, Formik } from "formik";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
import { userSchema } from "../../schema";
import useSnackbar from "../../context/Snackbar/useSnackbar";
import { cartApi, userApi } from "../../services/cartUserApi";
import { setAuthToken } from "../../config/api";

const Dashboard: FC = () => {
  const snack = useSnackbar();
  const theme = useTheme();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [cookies] = useCookies();
  let isAdmin = cookies.auth.admin;

  useEffect(() => {
    setAuthToken(cookies.auth.token);

    cartApi.getAll().then((data) => {
      let carts = data.map((c: any) => {
        return {
          cartId: c._id,
          description: c.description,
          tax: c.tax,
          discount: c.discount,
          products: c.products.map((p: any, index: number) => {
            return { ...p, qty: c.products[index].qty };
          }),
        };
      }) as Cart[];
      setCarts(carts);
    });

    userApi.getAll().then((data) => {
      setUsers(data);
    });
  }, [cookies.auth.token]);

  return (
    <div
      className={style.container}
      style={{
        color: theme.palette.textPrimary,
        backgroundColor: theme.palette.paper,
      }}
    >
      <div className={style.mode}>
        <h3>Mode</h3>
        <Select
          onChange={(value) => theme.changePalette(value.target.value as keys)}
          options={[
            { key: "dark", value: "dark" },
            { key: "primary", value: "white" },
            { key: "green", value: "green" },
            { key: "matrial", value: "matrial" },
          ]}
        />
      </div>
      <div
        className={style.divider}
        style={{ backgroundColor: theme.palette.secondary }}
      />

      <div className={style.checkedCarts}>
        <h3>CHECKED CARTS</h3>
        <CartTable
          className={style.list}
          onChoose={() => {}}
          noButton
          carts={carts}
        />
      </div>

      <div
        className={style.divider}
        style={{ backgroundColor: theme.palette.secondary }}
      />
      {isAdmin && (
        <>
          <div className={style.users}>
            <h3>USERS</h3>
            <div className={style.userList}>
              {users.map((u) => (
                <UserRow
                  key={u.username}
                  onClick={(e) => {
                    userApi.delete(u.username).then((res) => {
                      snack.onResponse({
                        message: res.message,
                        status: 200,
                      });

                      setUsers(
                        users.filter((user) => user.username !== u.username)
                      );
                    });
                  }}
                  isAdmin={u.admin}
                  username={u.username}
                />
              ))}
            </div>
            <div className={style.userCreation}>
              <h4>CREATE NEW USER</h4>
              <Formik
                initialValues={{ username: "", password: "", isAdmin: false }}
                validationSchema={userSchema}
                onSubmit={(values) => {
                  userApi
                    .create({
                      username: values.username,
                      password: values.password,
                      admin: values.isAdmin,
                    })
                    .then((res) => {
                      snack.onResponse({
                        message: res.username + " has been created",
                        status: 200,
                      });
                      setUsers((p) => {
                        return [...p, res];
                      });
                    })
                    .catch((err) => {
                      snack.onResponse({
                        message: err.response?.data?.message || "Error creating user",
                        status: err.response?.status || 500,
                      });
                    });
                }}
              >
                <Form className={style.form}>
                  <p>UserName</p>
                  <TextField
                    placeholder="Enter Username"
                    name="username"
                    width="100%"
                  />
                  <p>password</p>
                  <TextField
                    placeholder="Enter Password"
                    name="password"
                    type="password"
                    width="100%"
                  />
                  <div className={style.row}>
                    <p>Admin ? </p>
                    <TextField name="isAdmin" type="checkbox" width="4em" />
                  </div>
                  <div>
                    <Button type="submit" variant="error">
                      Create
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
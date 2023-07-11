import React, { FC, useEffect, useState } from "react";
import Select from "../../Components/Select";
import useTheme from "../../context/Theme/useTheme";
import { keys } from "../../context/Theme/Palettes";
import CartTable from "../../Components/CartTable";
import axios from "axios";
import style from "./style.module.css";
import { useCookies } from "react-cookie";
import UserRow from "./UserRow";
import { Form, Formik } from "formik";
import TextField from "../../Components/TextField";
import Button from "../../Components/Button";
/**
 * ## Dashboard page
 * Dashboard page the page that allow the user or admins to manipulate users settings
 * And the system sittings
 */
const Dashboard: FC = () => {
  const theme = useTheme();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [cookies] = useCookies();
  let isAdmin = cookies.auth.admin;
  useEffect(() => {
    axios.defaults.headers.post.Authorization = "barear " + cookies.auth.token;
    axios.defaults.headers.delete.Authorization =
      "barear " + cookies.auth.token;

    axios.get("http://localhost:5500/cart/carts").then((res) => {
      let carts = res.data.map((c: any) => {
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

    axios.get("http://localhost:5500/user/users").then((res) => {
      setUsers(res.data);
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
        <p>Mode</p>
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
      {isAdmin && (
        <div className={style.checkedCarts}>
          <h3>Checked Carts</h3>
          <CartTable
            className={style.list}
            onChoose={() => {}}
            noButton
            carts={carts}
          />
        </div>
      )}
      <div
        className={style.divider}
        style={{ backgroundColor: theme.palette.secondary }}
      />
      <div className={style.users}>
        <h3>Users</h3>
        <div className={style.userList}>
          {users.map((u) => (
            <UserRow
              onClick={(e) => {
                axios
                  .delete("http://localhost:5500/user/delete/" + u.username)
                  .then((res) => {
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
            onSubmit={(values) => {
              axios
                .post("http://localhost:5500/user/create", {
                  username: values.username,
                  password: values.password,
                  admin: values.isAdmin,
                })
                .then((res) => {
                  setUsers((p) => {
                    return [...p, res.data];
                  });
                });
            }}
          >
            <Form className={style.form}>
              <div style={{ display: "flex", gap: "1em" }}>
                <div className={style.row}>
                  <p>UserName</p>
                  <TextField placeholder="Enter Username" name="username" />
                </div>
                <div className={style.row}>
                  <p>password</p>
                  <TextField
                    placeholder="Enter Password"
                    name="password"
                    type="password"
                  />
                </div>
                <div className={style.row}>
                  <p>Admin ? </p>
                  <TextField name="isAdmin" type="checkbox" width="4em" />
                </div>
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
    </div>
  );
};

export default Dashboard;

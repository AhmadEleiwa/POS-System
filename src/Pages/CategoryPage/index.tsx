import { Form, Formik } from "formik";
import React, { FC, useState } from "react";
import TextField from "../../Components/TextField";
import { schema } from "../../schema";
import Button from "../../Components/Button";
import style from "./style.module.css";
import useTheme from "../../context/Theme/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SelectField from "../../Components/SelectFeild";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Reducers";
import {
  addCategory,
  removeCategory,
  updateCategory,
} from "../../store/Actions";
import axios from "axios";
/**
 * ## Product Category
 * Category page the page that allow the user to manipulate the different categories
 * in the system. The user can add or edit or even delete a category.
 * ```ts
 * type Category = {
 * categoryName:string,
 * }
 * ```
 */
const CategoryPage: FC = () => {
  const [status, setStatus] = useState<string>("add");
  const categories = useSelector<RootState>(
    (state) => state.categoriessReducer
  ) as Category[];
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <div className={style.container}>
      <div
        className={style.cate}
        style={{
          backgroundColor: theme.palette.paper,
          boxShadow: "0 2px 8px" + theme.palette.shadow,
        }}
      >
        <div className={style.switcher}>
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faAdd}
            onClick={() => setStatus("add")}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faEdit}
            onClick={() => setStatus("update")}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faTrashCan}
            onClick={() => setStatus("delete")}
          />
        </div>
        {status === "add" && (
          <Formik
            onSubmit={(values) => {
              axios
                .post("http://localhost:5500/category/new/", {
                  categoryName: values.category,
                })
                .then((res) => {
                  dispatch(addCategory(values.category));
                  alert(res.data.message);
                })
                .catch((err) => {
                  alert(err);
                });
            }}
            initialValues={{ category: "" }}
            validationSchema={schema}
          >
            <Form>
              <TextField
                id="category"
                name="category"
                placeholder="Enter Catgeory Name"
                width="100%"
              />
              <Button type="submit" fullWidth variant="error">
                Add
              </Button>
            </Form>
          </Formik>
        )}
        {status === "update" && (
          <Formik
            onSubmit={(values, actions) => {
              axios
                .post(
                  "http://localhost:5500/category/update/" +
                    values.selectedCategory,
                  { categoryName: values.category }
                )
                .then((res) => {
                  dispatch(
                    updateCategory(values.selectedCategory, values.category)
                  );
                })
                .catch((err) => {
                  alert(err);
                });
            }}
            initialValues={{
              category: "",
              selectedCategory: categories[0].categoryName,
            }}
            validationSchema={schema}
          >
            <Form>
              <SelectField
                name="selectedCategory"
                width="100%"
                options={categories.map((p) => {
                  return { key: p.categoryName, value: p.categoryName };
                })}
              />
              <TextField
                id="category"
                name="category"
                width="100%"
                placeholder="Enter New Catgeory Name"
              />
              <Button type="submit" fullWidth variant="error">
                Update
              </Button>
            </Form>
          </Formik>
        )}
        {status === "delete" && (
          <Formik
            onSubmit={(values) => {
              axios
                .delete(
                  "http://localhost:5500/category/delete/" +
                    values.selectedCategory
                )
                .then((res) => {
                  dispatch(removeCategory(values.selectedCategory));
                  alert(res.data.message);
                })
                .catch((err) => {
                  alert(err);
                });
            }}
            initialValues={{ selectedCategory: categories[0].categoryName }}
            validationSchema={schema}
          >
            <Form>
              <SelectField
                name="selectedCategory"
                width="100%"
                options={categories.map((p) => {
                  return { key: p.categoryName, value: p.categoryName };
                })}
              />
              <Button type="submit" fullWidth variant="error">
                Delete
              </Button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

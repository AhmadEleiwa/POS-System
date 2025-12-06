import { Form, Formik } from "formik";
import React, { FC, useState, useEffect } from "react";
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
  set_categories,
  updateCategory,
} from "../../store/Actions";
import useSnackbar from "../../context/Snackbar/useSnackbar";
import { categoryApi } from "../../services/categoryApi";

const CategoryPage: FC = () => {
  const [status, setStatus] = useState<string>("add");
  const categories = useSelector<RootState>(
    (state) => state.categoriessReducer
  ) as Category[];
  const { onResponse } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    categoryApi
      .getAll()
      .then((data) => dispatch(set_categories(data)))
      .catch((err) => {
        alert(err.response?.message || "Failed to fetch categories");
      });
  }, [dispatch]);

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
            className={status === "add" ? style.active : ""}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faEdit}
            onClick={() => setStatus("update")}
            className={status === "update" ? style.active : ""}
          />
          <FontAwesomeIcon
            fontSize={24}
            color={theme.palette.textPrimary}
            cursor={"pointer"}
            icon={faTrashCan}
            onClick={() => setStatus("delete")}
            className={status === "delete" ? style.active : ""}
          />
        </div>
        {status === "add" && (
          <Formik
            onSubmit={(values) => {
              categoryApi
                .create(values.category)
                .then((res) => {
                  onResponse({
                    message: res.message,
                    status: 200,
                  });
                  dispatch(addCategory(values.category));
                })
                .catch((err) => {
                  onResponse({
                    message: err.response?.data?.message || "Error adding category",
                    status: err.response?.status || 500,
                  });
                });
            }}
            initialValues={{ category: "" }}
            validationSchema={schema}
          >
            <Form>
              <TextField
                id="category"
                name="category"
                placeholder="Enter Category Name"
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
            onSubmit={(values) => {
              categoryApi
                .update(values.selectedCategory, values.category)
                .then((res) => {
                  onResponse({
                    message: res.message,
                    status: 200,
                  });
                  dispatch(
                    updateCategory(values.selectedCategory, values.category)
                  );
                })
                .catch((err) => {
                  onResponse({
                    message: err.response?.data?.message || "Error updating category",
                    status: err.response?.status || 500,
                  });
                });
            }}
            initialValues={{
              category: "",
              selectedCategory:
                categories.length > 0 ? categories[0].categoryName : "",
            }}
            validationSchema={schema}
          >
            <Form>
              {categories.length > 0 ? (
                <>
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
                    placeholder="Enter New Category Name"
                  />
                  <Button type="submit" fullWidth variant="error">
                    Update
                  </Button>
                </>
              ) : (
                <>
                  <h2 style={{ color: "white" }}>No Categories Found</h2>
                  <Button variant="secondary" onClick={() => setStatus("add")}>
                    Add Category
                  </Button>
                </>
              )}
            </Form>
          </Formik>
        )}
        {status === "delete" && (
          <Formik
            onSubmit={(values) => {
              categoryApi
                .delete(values.selectedCategory)
                .then((res) => {
                  onResponse({
                    message: res.message,
                    status: 200,
                  });
                  dispatch(removeCategory(values.selectedCategory));
                })
                .catch((err) => {
                  onResponse({
                    message: err.response?.data?.message || "Error deleting category",
                    status: err.response?.status || 500,
                  });
                });
            }}
            initialValues={{
              selectedCategory:
                categories.length > 0 ? categories[0].categoryName : "",
            }}
            validationSchema={schema}
          >
            <Form>
              {categories.length > 0 ? (
                <>
                  <SelectField
                    name="selectedCategory"
                    width="100%"
                    options={categories.map((p) => {
                      return {
                        key: p.categoryName ? p.categoryName : "",
                        value: p.categoryName ? p.categoryName : "",
                      };
                    })}
                  />

                  <Button type="submit" fullWidth variant="error">
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <h2 style={{ color: "white" }}>No Categories Found</h2>
                  <Button variant="secondary" onClick={() => setStatus("add")}>
                    Add Category
                  </Button>
                </>
              )}
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
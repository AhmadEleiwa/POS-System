import React, { FC, useState } from "react";
import TextField from "../../components/TextField";
import Select from "../../components/Select";
import Button from "../../components/Button";
import style from "./style.module.css";
import { useFormik } from "formik";
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
  const { values, handleChange } = useFormik({
    initialValues: {
      categoryValue: "ss",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={style.cate}>
      <form action="">
        <div className={style.form}>
          <TextField
            id="categoryValue"
            onChange={handleChange}
            value={values.categoryValue}
            placeholder="Enter Category Name"
          />
          <Select
            options={[
              { key: "---", value: "---" },
              { key: "Drink", value: "Drink" },
              { key: "Snack", value: "Snack" },
              { key: "Meat", value: "Meat" },
            ]}
          />
        </div>
        <div className={style.controls}>
          <Button variant="primary">Add</Button>
          <Button disabled variant="secondary">
            Update
          </Button>
          <Button disabled variant="error">
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryPage;

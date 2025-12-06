import React, { FC, useEffect } from "react";
import ProductList from "../../Components/ProductList";
import Aside from "../../Components/Aside";
import { set_categories, set_products, set_units } from "../../store/Actions";
import { useDispatch } from "react-redux";
import { categoryApi } from "../../services/categoryApi";
import { productApi } from "../../services/productApi";
import { unitApi } from "../../services/unitApi";

const PosPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    categoryApi
      .getAll()
      .then((data) => dispatch(set_categories(data)))
      .catch((err) => {
        alert(err.response?.message || "Failed to fetch categories");
      });
    productApi
      .getAll()
      .then((data) => dispatch(set_products(data)))
      .catch((err) => {
        alert(err.response?.message || "Failed to fetch products");
      });
    unitApi
      .getAll()
      .then((data) => dispatch(set_units(data)))
      .catch((err) => {
        alert(err.response?.message || "Failed to fetch units");
      });
  }, [dispatch]);

  return (
    <>
      <ProductList />
      <Aside />
    </>
  );
};

export default PosPage;
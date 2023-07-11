import React, { FC, useEffect } from "react";
import ProductList from "../../Components/ProductList";
import Aside from "../../Components/Aside";
import axios from "axios";
import { set_categories, set_products, set_units } from "../../store/Actions";
import { useDispatch } from "react-redux";

/**
 * ## POS Page
 * POS Page is the main page of the system witch allow the user to handle the carts/orders.
 * It allow to add or delete products from the carts or even continue the payment.
 * ```ts
 * type Cart = {// order
 * cartId: uuid() //universal unique identifier
 * description: string,
 * tax: double,
 * discount: double,
 * products: Product[]
 * }
 * ```
 */
const PosPage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5500/category/categories")
      .then((res) => dispatch(set_categories(res.data)))
      .catch((err) => {
        alert(err.response.message);
      });
    axios
      .get("http://localhost:5500/product/products")
      .then((res) => dispatch(set_products(res.data)))
      .catch((err) => {
        alert(err.response.message);
      });
    axios
      .get("http://localhost:5500/unit/units")
      .then((res) => dispatch(set_units(res.data)))
      .catch((err) => {
        alert(err.response.message);
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

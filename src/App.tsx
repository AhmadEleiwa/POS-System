import React, { useEffect } from "react";
import "./App.css";
import Router from "./Router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { set_categories, set_products, set_units } from "./store/Actions";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:5500/category/categories")
      .then((res) => dispatch(set_categories(res.data)))
      .catch();

    axios
      .get("http://localhost:5500/product/products")
      .then((res) => dispatch(set_products(res.data)))
      .catch();
    axios
      .get("http://localhost:5500/unit/units")
      .then((res) => dispatch(set_units(res.data)))
      .catch();
  }, [dispatch]);
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

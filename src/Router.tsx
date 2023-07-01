import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guard from "./Guards/Guard";
import PosPage from "./Pages/PosPage";
import ProductPage from "./Pages/ProductPage";
import CategoryPage from "./Pages/CategoryPage";
import UnitOfMeasurePage from "./Pages/UnitOfMeasurePage";
import AuthenticationGuard from "./Guards/AuthenticationGuard";
import AuthenticationPage from "./Pages/AuthenticationPage";
import Navbar from "./Components/Navbar";
import Layout from "./Layout";
import CartTable from "./Components/CartTable";
import ProductList from "./Components/ProductList";
import Aside from "./Components/Aside";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Guard>
              <Layout>
                <PosPage />
              </Layout>
            </Guard>
          }
        ></Route>
        <Route
          path="/product"
          element={
            <Guard>
              <Layout>
                <ProductPage />
              </Layout>
            </Guard>
          }
        ></Route>
        <Route
          path="/category"
          element={
            <Guard>
              <Layout>
                <CategoryPage />
              </Layout>
            </Guard>
          }
        ></Route>
        <Route
          path="/unit-measure"
          element={
            <Guard>
              <Layout>
                <UnitOfMeasurePage />
              </Layout>
            </Guard>
          }
        ></Route>

        <Route
          path="/auth"
          element={
            <AuthenticationGuard>
              <AuthenticationPage />
            </AuthenticationGuard>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;

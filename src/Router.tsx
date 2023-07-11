import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guard from "./Guards/Guard";
import PosPage from "./Pages/PosPage";
import ProductPage from "./Pages/ProductPage";
import CategoryPage from "./Pages/CategoryPage";
import UnitOfMeasurePage from "./Pages/UnitOfMeasurePage";
import AuthenticationGuard from "./Guards/AuthenticationGuard";
import AuthenticationPage from "./Pages/AuthenticationPage";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard";
import Logout from "./Pages/Logout";

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
              <Layout>
                <AuthenticationPage />
              </Layout>
            </AuthenticationGuard>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <Guard>
              <Layout>
                <Dashboard />
              </Layout>
            </Guard>
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <Guard>
              <Layout>
                <Logout />
              </Layout>
            </Guard>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;

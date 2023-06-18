import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guard from "./Guards/Guard";
import PosPage from "./Pages/PosPage";
import ProductPage from "./Pages/ProductPage";
import CategoryPage from "./Pages/CategoryPage";
import UnitOfMeasurePage from "./Pages/UnitOfMeasurePage";
import AuthenticationGuard from "./Guards/AuthenticationGuard";
import AuthenticationPage from "./Pages/AuthenticationPage";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Guard>
              <PosPage />
            </Guard>
          }
        ></Route>
        <Route
          path="/product"
          element={
            <Guard>
              <ProductPage />
            </Guard>
          }
        ></Route>
        <Route
          path="/category"
          element={
            <Guard>
              <CategoryPage />
            </Guard>
          }
        ></Route>
        <Route
          path="/unit-of-measure"
          element={
            <Guard>
              <UnitOfMeasurePage />
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

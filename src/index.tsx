import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/Reducers";
import { Provider } from "react-redux";
import SnackProvider from "./context/Snackbar/SnackProvider";
import ThemeProvider from "./context/Theme/ThemeProvider";

const store = configureStore({ reducer: rootReducer });
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <SnackProvider>
        <App />
      </SnackProvider>
    </ThemeProvider>
  </Provider>
);

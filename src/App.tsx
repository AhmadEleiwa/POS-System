import React from "react";
import "./App.css";
import Router from "./Router";
import { CookiesProvider } from "react-cookie";


function App() {
  return (
    <div className="App">
      <CookiesProvider>

      <Router />
      </CookiesProvider>
    </div>
  );
}

export default App;

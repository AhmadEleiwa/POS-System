import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Router from "./Router";
import ThemeProvider from "./context/Theme/ThemeProvider";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;

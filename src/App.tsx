import React from "react";
import "./App.css";
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

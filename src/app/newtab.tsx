import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./newtab/header";

import "../style/styles.css";

const App = () => {
  
  return (
    <>
      <h1 className="w-full h-screen bg-blue-300">
        Hello React! from new tab
      </h1>
      <Header />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));

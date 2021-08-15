import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./newtab/header";

import "../style/styles.css";

const App = () => {
  
  const clickHandler = () => {
    let queryOptions = {};
    chrome.tabs.query(queryOptions).then((res) => {
      console.log(res);
    });
    // chrome.runtime.sendMessage({
    //   method: "allTabs"
    // }, (response) => {
    //   console.log(response)
    // });
    console.log("clicked")
  }

  return (
    <div className="w-full h-screen bg-blue-900 p-12">
      <h1 className="w-full h-32 text-white">
        Hello React! from new tab<br/>
      <button onClick={clickHandler}>Click Me!</button>
      </h1>
      <Header />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));

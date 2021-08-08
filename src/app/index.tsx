import React from "react";
import ReactDOM from "react-dom";

import "../style/styles.css";

const App = () => <h1 className="w-full h-screen bg-blue-300">Hello React! webpack watch</h1>;

ReactDOM.render(<App />, document.getElementById("app-root"));

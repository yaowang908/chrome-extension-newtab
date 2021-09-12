import React from "react";
import ReactDOM from "react-dom";

import "../style/styles.css";
import Help from "./help/Help.component";

const App = () => (
  <Help />
);

ReactDOM.render(<App />, document.getElementById("app-root"));

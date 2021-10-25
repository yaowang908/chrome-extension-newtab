import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from './newtab/app.component';
import "../style/styles.css";

const Newtab: React.FC = () => {

  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

ReactDOM.render(<Newtab />, document.getElementById("app-root"));

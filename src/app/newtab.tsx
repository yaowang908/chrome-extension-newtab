import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from './newtab/app.component';
import "../style/styles.css";

const Newtab: React.FC = () => {
  // TODO: one of the three columns can be used a container for important links to preserve
  // React.useEffect(() => {
  //   const windowCloseHandler = () => {
  //     alert("window closed")
  //   }
  //   // this only fires when multiple windows exist, and close one of them
  //   chrome.windows.onRemoved.addListener(windowCloseHandler);
  // }, [])

  React.useEffect(() => {
    console.log(chrome.sessions)
    chrome?.sessions?.getRecentlyClosed((res) => {
      console.log(res);
    })
  }, [])

  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

ReactDOM.render(<Newtab />, document.getElementById("app-root"));

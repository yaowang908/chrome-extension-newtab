import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from './newtab/app.component';
import "../style/styles.css";

const Newtab: React.FC = () => {

  const keepDefaultNewTab = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      console.log(activeTab);
      if (activeTab?.url && activeTab.url === "chrome://newtab/") {
        chrome.tabs.update({
          url: "chrome-search://local-ntp/local-ntp.html",
        });
      }
    });
  }
  
  chrome.storage.sync.get(["setting"], function (result) {
    if ("setting" in result) {
      //do something
      if (result?.setting?.replaceTheDefaultNewTab) {
        //replace default new tab
      } else {
        //load default new tab only when url match chrome://newtab/
        keepDefaultNewTab();
      }
    } else {
      keepDefaultNewTab();
    }
  });


  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

ReactDOM.render(<Newtab />, document.getElementById("app-root"));

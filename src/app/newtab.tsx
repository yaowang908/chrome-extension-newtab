import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./newtab/header";
import Row from "./newtab/row/row.component";
import { LinkProps } from './newtab/link/link.interfaces';

import "../style/styles.css";

const App: React.FC = () => {
  const [dataArr, setDataArr] = React.useState<LinkProps[] | undefined>(undefined);

  React.useEffect(() => {
    chrome.storage.local.get(['tabs'], function(result) {
      if(result.tabs) {
        setDataArr(result.tabs);
      }
    });
  }, [])

  const clickHandler = () => {
    let queryOptions = {};
    chrome.tabs.query(queryOptions).then((res) => {
      console.log(res);
      const formatData = res.map((x) => ({
        imageUrl: x?.favIconUrl,
        link: x?.url,
        title: x?.title
      }));
      chrome.storage.local.set({tabs: formatData}, function() {
        console.log('Tabs are saved locally ');
      });
      setDataArr(formatData);
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
      <Header />
      <h1 className="w-full h-32 text-white">
        Hello React! from new tab<br/>
        <button onClick={clickHandler}>Click Me!</button>
      </h1>
      <Row contentArr={dataArr}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));

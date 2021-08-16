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

  const collectClickHandler = () => {
    let queryOptions = {};
    chrome.tabs.query(queryOptions).then((res) => {
      console.log(res);
      const formatData = res.filter(x => x?.url && !(x?.url.includes('chrome://'))).map((x) => ({
          imageUrl: x?.favIconUrl,
          link: x?.url,
          title: x?.title
        })
      );
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

  const closeClickHandler = () => {

  }

  const resetClickHandler = () => {
    if(window.confirm("Are you sure about delete all saved tabs?")) {
      chrome.storage.local.remove(["tabs"], function() {
        let error = chrome.runtime.lastError;
        if(error) {
          console.error(error)
        }
      });
      setDataArr(undefined);
    } else {
      console.log("Abort!")
    }
  }

  return (
    <div className="w-full h-screen bg-blue-900 p-12">
      <Header />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <div className="w-full grid grid-cols-2 gap-4 my-4">
            <button onClick={collectClickHandler} className="text-white hover:text-yellow-500 hover:border-yellow-500">Collect all tabs!</button>
            <button onClick={closeClickHandler} className="text-white hover:text-yellow-500 hover:border-yellow-500">Close all tabs!</button>
            <button onClick={resetClickHandler} className='text-white cols-span-2 hover:text-red-900 hover:border-red-900'>Reset all</button>
          </div>
          <Row contentArr={dataArr}/>
        </div>
        <div>Column 2</div>
        <div>Column 3</div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));

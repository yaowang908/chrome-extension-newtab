import React from "react";
import ReactDOM from "react-dom";
import { useSetRecoilState } from 'recoil';

import { links } from '../Recoil/newtab.atom';
import { LinkProps } from '../tabs/link/link.interfaces';

export const Header = () => {
  const setDataArr = useSetRecoilState(links);

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
    <div className="w-full border-b-2 border-white flex flex-row justify-between">
      <div className="text-4xl text-white">Life is too short!</div>

      <div className="w-96 grid grid-cols-3 gap-2 mb-4">
        <button onClick={collectClickHandler} >Collect all tabs!</button>
        <button onClick={closeClickHandler} >Close all tabs!</button>
        <button onClick={resetClickHandler} className='text-white cols-span-2 hover:text-red-900 hover:border-red-900'>Reset all</button>
      </div>
    </div>
  )
};


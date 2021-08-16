import React from 'react';

import Section from '../section/section.component';
import Row from "./row/row.component";
import { LinkProps } from './link/link.interfaces';

const TabsSection: React.FC = () => {
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
    <Section>
      <div className="w-full grid grid-cols-3 gap-2 mb-4">
        <button onClick={collectClickHandler} >Collect all tabs!</button>
        <button onClick={closeClickHandler} >Close all tabs!</button>
        <button onClick={resetClickHandler} className='text-white cols-span-2 hover:text-red-900 hover:border-red-900'>Reset all</button>
      </div>
      <Row contentArr={dataArr}/>
    </Section>
  )
}

export default TabsSection;
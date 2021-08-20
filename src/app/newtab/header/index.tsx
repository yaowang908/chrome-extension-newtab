import React from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { nanoid } from "nanoid";

import { linksSelector } from '../Recoil/links_selector.atom';
import { LinkProps } from "../tabs/link/link.interfaces";
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import setting from '../setting/setting';

export const Header = () => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);

  React.useEffect(() => {
    chrome.storage.local.get(['tabs'], function(result) {
      if(result.tabs) {
        setDataArr(result.tabs);
      }
    });
  }, []);

  React.useEffect(() => {
    chrome.storage.local.set({tabs: dataArr}, function() {
      console.log('Tabs are saved locally ');
    });
  }, [dataArr])

  const collectClickHandler = () => {
    let queryOptions = {};
    chrome.tabs.query(queryOptions).then((res) => {
      // console.log(res);
      const formatData = res.filter(x => x?.url && !(x?.url.includes('chrome://'))).map((x, index) => ({
          id: index + '_' + nanoid(),
          imageUrl: x?.favIconUrl,
          link: x?.url,
          title: x?.title,
          priority: 0,
        })
      );
      if(dataArr) {
        const newState = [...dataArr, ...formatData];
        if(hasDuplicates(newState)) {
          console.log("Removed duplicates!")
          setDataArr(removeDuplicates(newState));
        } else {
          setDataArr(newState);
        }
        // setDataArr([...dataArr, ...formatData]);
      } else {
        setDataArr(formatData);
      }
    });
    // chrome.runtime.sendMessage({
    //   method: "allTabs"
    // }, (response) => {
    //   console.log(response)
    // });
  }

  const removeDuplicates = (arr:LinkProps[]) => {
    return arr.filter((value, index, array) => array.findIndex(t => (t.link === value.link)) === index);
  }

  const hasDuplicates = (arr:LinkProps[]) => {
    const uniqueUrls = new Set(arr.map(x => x.link));
    if (uniqueUrls.size < arr.length) {
      return true;
    }
    return false;
  }

  const closeClickHandler = () => {
    let queryOptions = {};
    chrome.tabs.query(queryOptions).then((res) => {
      const tabIdArr: number[] = res?.filter( r => r)?.filter(x => !x.active)?.map(i => i.id ? i.id : 0 ) || [];
      // console.log(tabIdArr);
      if(tabIdArr) {
        chrome.tabs.remove(tabIdArr.filter(x => x)).then((res) => {
          console.log('Closed tabs')
        })
      }
    })
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
    <div className={`flex-initial w-full border-b-2 ${setting.headBorder[colorTheme]} flex flex-row justify-between`}>
      <div className={`text-4xl ${setting.text[colorTheme]}`}>Life is too short!</div>

      <div className={`w-96 grid grid-cols-3 gap-2 mb-4 ${setting.text[colorTheme]}`}>
        <button onClick={collectClickHandler} className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]}`}>Collect all tabs!</button>
        <button onClick={closeClickHandler} className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]}`}>Close all tabs!</button>
        <button onClick={resetClickHandler} className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} cols-span-2 hover:text-red-900 hover:border-red-900`}>Reset all</button>
      </div>
    </div>
  )
};


import React from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { nanoid } from "nanoid";

import { linksSelector } from '../Recoil/links_selector.atom';
import { LinkProps } from "../tabs/link/link.interfaces";
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import { groupSelector } from '../Recoil/group_selector.atom';
import setting from '../setting/setting';
import { visibleSelector } from '../Recoil/visible.atom';
import { settingDialogueVisibility } from "../Recoil/setting.atom";

export const Header = () => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const resetLinks = useResetRecoilState(linksSelector);
  const resetGroups = useResetRecoilState(groupSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  const [visible, setVisible] = useRecoilState(visibleSelector);
  const [settingVisibility, setSettingVisibility] = useRecoilState(
    settingDialogueVisibility
  );

  React.useEffect(() => {
    chrome.storage.local.get(['tabs'], function(result) {
      if(result.tabs) {
        setDataArr(result.tabs);
        // console.log('header index: ', result.tabs);
      }
    });
  }, []);

  React.useEffect(() => {
    chrome.storage.local.get(["visible"], function (result) {
      if (result.visible) {
        setVisible(result.visible);
      }
    });
  }, []);

  const collectClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let queryOptions = {};

    const getOrder = (
      prevArr: LinkProps[] | undefined,
      currentIndex: number
    ) => {
      if (prevArr) {
        return prevArr.length + currentIndex;
      }
      return currentIndex;
    };

    chrome.tabs.query(queryOptions).then((res) => {
      // console.log(res);
      const formatData = res
        .filter((x) => x?.url && !x?.url.includes("chrome://"))
        .map((x, index) => ({
          id: index + "_" + nanoid(),
          index: getOrder(dataArr, index),
          imageUrl: x?.favIconUrl,
          link: x?.url,
          title: x?.title,
          priority: 0,
        }));
      if (dataArr) {
        const newState = [...dataArr, ...formatData];
        if (hasDuplicates(newState)) {
          console.log("Removed duplicates!");
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
    closeClickHandler();
  };

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

  const openAllClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dataArr?.map((link, index) => {
      if (!index) {
        chrome.tabs.create({
          active: true,
          url: link.link,
        });
      }
      chrome.tabs.create({
        active: false,
        url: link.link,
      });
    });
  };

  const resetClickHandler = () => {
    if(window.confirm("Are you sure about delete all saved tabs?")) {
      chrome.storage.local.remove(["tabs", "groups"], function() {
        let error = chrome.runtime.lastError;
        if(error) {
          console.error(error)
        }
      });
      resetLinks();
      resetGroups();
    } else {
      console.log("Abort!")
    }
  }

  const headerClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Single Click!");
    e.stopPropagation();
    setVisible(!visible);
  }
  
  const headerDoubleClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Double Click!");
    e.stopPropagation();
    setVisible(!visible);
  };

  const settingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSettingVisibility(!settingVisibility);
  };

  return (
    <div
      className={`flex-initial w-full border-b-2 ${
        setting.headBorder[colorTheme]
      } ${
        visible ? "flex" : "hidden"
      } flex-col sm:flex-row justify-between z-40`}
      onDoubleClick={headerDoubleClickHandler}
      onClick={headerClickHandler}
    >
      <div className={`text-4xl ${setting.text[colorTheme]}`}>Dashboard</div>

      <div
        className={`w-full sm:w-96 grid grid-cols-4 gap-2 mb-4 ${setting.text[colorTheme]}`}
      >
        <button
          onClick={settingClickHandler}
          className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} text-lg`}
        >
          Setting
        </button>
        <button
          onClick={collectClickHandler}
          className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} text-lg`}
        >
          Collect
        </button>
        <button
          onClick={openAllClickHandler}
          className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} text-lg`}
        >
          Open all
        </button>
        <button
          onClick={resetClickHandler}
          className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} text-lg cols-span-2 hover:text-red-900 hover:border-red-900`}
        >
          Reset
        </button>
      </div>
    </div>
  );
};


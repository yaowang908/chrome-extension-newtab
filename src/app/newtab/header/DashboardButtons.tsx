import React from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { nanoid } from "nanoid";

import { linksSelector } from "../Recoil/links_selector.atom";
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import { LinkProps } from "../tabs/link/link.interfaces";
import { groupSelector } from "../Recoil/group_selector.atom";
import setting from "../setting/setting";
import { visibleSelector } from "../Recoil/visible.atom";
import { settingDialogueVisibility } from "../Recoil/setting.atom";
import { viewSelector } from "../Recoil/view.atom";
import handleDuplicates from "../Helper/duplicateLinks";
import closeChromeTabs from '../Helper/chromeCloseTabs';

const DashboardButtons = () => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const resetLinks = useResetRecoilState(linksSelector);
  const resetGroups = useResetRecoilState(groupSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  const [visible, setVisible] = useRecoilState(visibleSelector);
  const [viewState, setViewState] = useRecoilState(viewSelector);
  const [settingVisibility, setSettingVisibility] = useRecoilState(
    settingDialogueVisibility
  );
  
  
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
        setDataArr(handleDuplicates(newState));
        // if (hasDuplicates(newState)) {
        //   console.log("Removed duplicates!");
        //   setDataArr(removeDuplicates(newState));
        // } else {
        //   setDataArr(newState);
        // }
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

  const closeClickHandler = () => {
    closeChromeTabs();
  };

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
    if (window.confirm("Are you sure about delete all saved tabs?")) {
      chrome.storage.local.remove(["tabs", "groups"], function () {
        let error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
      });
      resetLinks();
      resetGroups();
    } else {
      console.log("Abort!");
    }
  };
  
  const settingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSettingVisibility(!settingVisibility);
  };

  return (
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
  );
}

export default DashboardButtons

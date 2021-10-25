import React from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { nanoid } from "nanoid";

import { linksSelector } from "../Recoil/links_selector.atom";
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import { LinkProps } from "../tabs/link/link.interfaces";
import setting from "../setting/setting";
import { settingDialogueVisibility } from "../Recoil/setting.atom";
import handleDuplicates from "../Helper/duplicateLinks";
import closeChromeTabs from '../Helper/chromeCloseTabs';


export const getOrder = (
  prevArr: LinkProps[] | undefined,
  currentIndex: number
) => {
  if (prevArr) {
    return prevArr.length + currentIndex;
  }
  return currentIndex;
};

const DashboardButtons = () => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  const [settingVisibility, setSettingVisibility] = useRecoilState(
    settingDialogueVisibility
  );
  
  const collectClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let queryOptions = {};

    chrome.tabs.query(queryOptions).then((res) => {
      // console.log(res);
      const formatData = res
        // .filter((x) => x?.url && !x?.url.includes("chrome://"))
        .filter((x) => x?.url)
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
      } else {
        setDataArr(formatData);
      }
    });
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

  // const resetClickHandler = () => {
  //   if (window.confirm("Are you sure about delete all saved tabs?")) {
  //     chrome.storage.sync.remove(["tabs", "groups"], function () {
  //       let error = chrome.runtime.lastError;
  //       if (error) {
  //         console.error(error);
  //       }
  //     });
  //     resetLinks();
  //     resetGroups();
  //   } else {
  //     console.log("Abort!");
  //   }
  // };
  
  const settingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSettingVisibility(!settingVisibility);
  };


  return (
    <div
      className={`w-full md:w-96 h-full grid grid-cols-3 items-center gap-2 mb-4`}
      style={{
        color: `var(--textColor)`,
      }}
    >
      <button
        onClick={collectClickHandler}
        className={`text-lg`}
        style={{
          borderColor: `var(--textColor)`,
          color: `var(--textColor)`,
        }}
      >
        Collect
      </button>
      <button
        onClick={openAllClickHandler}
        className={`text-lg`}
        style={{
          borderColor: `var(--textColor)`,
          color: `var(--textColor)`,
        }}
      >
        Open all
      </button>
    </div>
  );
}

export default DashboardButtons

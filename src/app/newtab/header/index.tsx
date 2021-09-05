import React from "react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";

import { linksSelector } from '../Recoil/links_selector.atom';
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import setting from '../setting/setting';
import { visibleSelector } from '../Recoil/visible.atom';
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.component";
import { viewSelector } from '../Recoil/view.atom';
import DashboardButtons from "./DashboardButtons";

export const Header = () => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  const [visible, setVisible] = useRecoilState(visibleSelector);
  const [viewState, setViewState] = useRecoilState(viewSelector);

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

  React.useEffect(() => {
    chrome.storage.local.get(["view"], function (result) {
      if (result.view) {
        setViewState(result.view);
      }
    });
  }, []);

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

  const viewClickHandler = (selectedName: ('Dashboard' | 'Bookmark')) => {
    console.log(selectedName);
    setViewState(selectedName)
  }
  // DONE: hide buttons when in bookmark view
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
      <div className={`text-4xl ${setting.text[colorTheme]}`}>
        <ToggleSwitch
          defaultName="Dashboard"
          optionName="Bookmark"
          selectedPosition={viewState === "Dashboard" ? 0 : 1}
          onChange={viewClickHandler}
        />
      </div>
      {viewState === "Dashboard" ? <DashboardButtons /> : ""}
    </div>
  );
};


import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { linksSelector } from '../Recoil/links_selector.atom';
import {
  colorThemeSelector,
  colorThemeChangedSelector,
} from "../Recoil/color_theme.atom";
import setting from '../setting/setting';
import { visibleSelector } from '../Recoil/visible.atom';
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.component";
import { viewSelector, viewType } from "../Recoil/view.atom";
import DashboardButtons from "./DashboardButtons";
import BookmarkViewButtons from './BookmarkViewButtons';
import QuickLinksButtons from './QuickLinksButtons';
import { listViewLeftPanelVisibilitySelector } from "../Recoil/bookmarks.selector";
import {settingSelector} from '../Recoil/setting.atom';

export const Header = () => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeSelector);
  const setColorThemeChangedAtom = useSetRecoilState(colorThemeChangedSelector);
  const [visible, setVisible] = useRecoilState(visibleSelector);
  const [viewState, setViewState] = useRecoilState(viewSelector);
  const setListViewLeftPanelVisibility = useSetRecoilState(
    listViewLeftPanelVisibilitySelector
  );
  const [settingState, setSettingSelector] = useRecoilState(settingSelector);

  React.useEffect(() => {
    chrome.storage.sync.get(
      ["tabs", "visible", "view", "LVLPVisibility", "colorTheme", "setting"],
      function (result) {
        // console.log('get tabs from sync storage',result);
        if ("tabs" in result) {
          setDataArr(result.tabs);
          // console.log('header index: ', result.tabs);
        }
        if ("visible" in result) {
          setVisible(result.visible);
        }
        if ("view" in result) {
          setViewState(result.view);
        }
        if ("LVLPVisibility" in result) {
          setListViewLeftPanelVisibility(result.LVLPVisibility);
        }
        if ("colorTheme" in result) {
          setColorTheme(result.colorTheme.colorTheme);
          setColorThemeChangedAtom(result.colorTheme.colorThemeChanged);
          // console.log('colorThemeChanged: ', result.colorTheme.colorThemeChanged)
        }
        if ("setting" in result) {
          setSettingSelector(result.setting);
        }
      }
    );
  }, []);

  const headerClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log("Single Click!");
    e.stopPropagation();
    if (settingState.clickToHide) setVisible(!visible);
  };

  const headerDoubleClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log("Double Click!");
    e.stopPropagation();
    if (settingState.clickToHide) setVisible(!visible);
  };

  const viewClickHandler = (selectedName: viewType) => {
    // console.log(selectedName);
    setViewState(selectedName);
  };
  // DONE: hide buttons when in bookmark view

  const renderButtons = () => {
    if(viewState === 'Dashboard') return <DashboardButtons />;
    if(viewState === 'Bookmark') return <BookmarkViewButtons />;
    if(viewState === 'QuickLinks') return <QuickLinksButtons />;
  }

  return (
    <div
      className={`flex-initial w-full border-b-2 ${
        setting.headBorder[colorTheme]
      } ${
        visible ? "flex" : "hidden"
      } flex-col md:flex-row justify-between z-40`}
      onDoubleClick={headerDoubleClickHandler}
      onClick={headerClickHandler}
    >
      <div
        className={`text-4xl mb-4 ${setting.text[colorTheme]}`}
        style={{ maxWidth: "26rem" }}
      >
        <ToggleSwitch
          defaultName="Dashboard"
          // optionName="Bookmark"
          optionName="QuickLinks"
          selectedPosition={viewState === "Dashboard" ? 0 : 1}
          onChange={viewClickHandler}
        />
      </div>
      {renderButtons()}
    </div>
  );
};


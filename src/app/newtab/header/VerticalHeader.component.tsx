import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { linksSelector } from "../Recoil/links_selector.atom";
import {
  colorThemeSelector,
  colorThemeChangedSelector,
} from "../Recoil/color_theme.atom";
import setting from "../setting/setting";
import { visibleSelector } from "../Recoil/visible.atom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.component";
import { viewSelector, viewType } from "../Recoil/view.atom";
import DashboardButtons from "./DashboardButtons";
import BookmarkViewButtons from "./BookmarkViewButtons";
import QuickLinksButtons from "./QuickLinksButtons";
import { listViewLeftPanelVisibilitySelector } from "../Recoil/bookmarks.selector";
import { settingSelector } from "../Recoil/setting.atom";
import arrow from "../../../assets/arrow.png";

export const VerticalHeader = () => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeSelector);
  const setColorThemeChangedAtom = useSetRecoilState(colorThemeChangedSelector);
  const [visible, setVisible] = useRecoilState(visibleSelector);
  const [viewState, setViewState] = useRecoilState(viewSelector);
  // const [view, setView] = useRecoilState(viewSelector);
  const setListViewLeftPanelVisibility = useSetRecoilState(
    listViewLeftPanelVisibilitySelector
  );
  const [settingState, setSettingSelector] = useRecoilState(settingSelector);

  const buttonHighlighter = React.useRef<HTMLDivElement>(null);

  // app init
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

  // button animation
  React.useEffect(() => {
    if (buttonHighlighter) {
      if (viewState === "QuickLinks" || viewState === "Bookmark") {
        buttonHighlighter.current?.classList.add("translate-y-full", "mt-2");
      } else {
        buttonHighlighter.current?.classList.remove("translate-y-full", "mt-2");
      }
    }
  }, [viewState]);

  // view toggle buttons function
  const buttonsClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    // console.log(target.getAttribute("data-view"));
    if (target.classList.value.includes("nav-ele")) {
      setViewState(target.getAttribute("data-view") as "Dashboard" | "QuickLinks");
    }
  };

  return (
    <div className="navigation h-screen w-24 flex flex-col justify-between items-center px-5 py-10 font-bold text-xl">
      <div className="w-6 h-80 flex flex-col justify-between">
        <div>
          <img src="https://assets.codepen.io/390494/Vector+1.png" />
        </div>
        <div
          className="h-60 relative grid grid-rows-2 gap-8 pointer-events-none"
          onClick={buttonsClickHandler}
        >
          <div
            className="nav-ele z-10 pointer-events-auto cursor-pointer"
            data-view="Dashboard"
          >
            Dashboard
          </div>
          <div
            className="nav-ele z-10 pointer-events-auto cursor-pointer"
            data-view="QuickLinks"
          >
            QuickLinks
          </div>
          <div
            className="nav-select w-10 h-32 bg-blue-600 absolute z-0 -left-2 -top-3 rounded-lg transform duration-300 ease-in-out"
            ref={buttonHighlighter}
          ></div>
        </div>
      </div>
      <div className="nav-ele">Setting</div>
    </div>
  );
};
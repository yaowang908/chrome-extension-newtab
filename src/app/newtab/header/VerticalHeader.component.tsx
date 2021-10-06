import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { linksSelector } from "../Recoil/links_selector.atom";
import {
  colorThemeSelector,
  colorThemeChangedSelector,
} from "../Recoil/color_theme.atom";
import { visibleSelector } from "../Recoil/visible.atom";
import { viewSelector, viewType } from "../Recoil/view.atom";
import { listViewLeftPanelVisibilitySelector } from "../Recoil/bookmarks.selector";
import { settingSelector } from "../Recoil/setting.atom";
import arrow from "../../../assets/arrow.png";
import { settingDialogueVisibility } from "../Recoil/setting.atom";
import { QuickLinksSelector } from "../Recoil/quicklinks.atom";
import { collapseAtom } from "../Recoil/collapse.atom";
import delay from "../Helper/delay";

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
  const [settingVisibility, setSettingVisibility] = useRecoilState(
    settingDialogueVisibility
  );
  const setQuickLinksArr = useSetRecoilState(QuickLinksSelector);
  const [collapseState, setCollapseState] = useRecoilState(collapseAtom);

  const buttonHighlighter = React.useRef<HTMLDivElement>(null);

  // app init
  React.useEffect(() => {
    chrome.storage.sync.get(
      ["tabs", "visible", "view", "LVLPVisibility", "colorTheme", "setting", "quickLinks",],
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
        if ("quickLinks" in result) {
          setQuickLinksArr(result.quickLinks);
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
    const switchView = () => {
      if (target.classList.value.includes("nav-ele")) {
        setViewState(
          target.getAttribute("data-view") as "Dashboard" | "QuickLinks"
          );
      }
    }

    if(collapseState) {
      delay(700, switchView);
      setCollapseState(false);
      // DONE: wait for 700ms for animation duration
    } else {
      switchView();
    }

  };

  //setting
  const settingClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSettingVisibility(!settingVisibility);
  };

  //toggle collapse
  const collapseClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('toggle collapse')
    setCollapseState(!collapseState);
  };

  return (
    <div
      className="bg navigation h-screen relative z-10 w-24 px-5 font-bold text-xl transition ease-in-out duration-700"
      style={{
        borderRadius: `${collapseState ? "2rem 0 0 2rem" : "0"}`,
        transform: `${
          collapseState
            ? "translateX(calc(100vw - 6rem))"
            : "translateX(0)"
        }`,
      }}
    >
      <div
        className="w-full h-24 pt-8 mx-auto pointer-events-auto cursor-pointer"
        onClick={collapseClickHandler}
      >
        <img
          className="box-border mx-auto w-6 h-6 transition ease-in-out duration-500"
          src={arrow}
          style={{
            transform: `${collapseState ? "rotate(180deg)" : "rotate(0)"}`,
          }}
        />
      </div>
      <div className="w-6 h-auto mt-4 mx-auto flex flex-col justify-between">
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
      <div className="w-14 h-auto absolute bottom-0">
        <div
          className="nav-ele cursor-pointer mx-auto"
          onClick={settingClickHandler}
        >
          Setting
        </div>
        <div className="w-full h-24"></div>
      </div>
    </div>
  );
};

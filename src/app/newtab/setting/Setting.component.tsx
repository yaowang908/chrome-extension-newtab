import React from 'react'
import { useRecoilState } from 'recoil';

import Popup from '../Popup/Popup.component';
import {settingDialogueVisibility, settingSelector} from '../Recoil/setting.atom';
import {
  colorThemeSelector,
  colorThemeProp,
  colorThemeChangedSelector,
} from "../Recoil/color_theme.atom";

const Setting = () => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeSelector);
  const [colorThemeChangedState, setColorThemeChangedState] = useRecoilState(
    colorThemeChangedSelector
  );
  const [settingVisibility, setSettingVisibility] = useRecoilState(
    settingDialogueVisibility
  );
  const [settingState, setSettingState] = useRecoilState(settingSelector)

  const closeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if(e.target === e.currentTarget) {
      setSettingVisibility(!settingVisibility);
    }
  }

  const themeOnChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    console.log("themeChange: ", e.target.value);
    if(e.target.value === 'DEFAULT') return;
    setColorTheme(e.target.value as colorThemeProp);
    setColorThemeChangedState(true);
  };

  const getThemeName = (
    e: "blueTheme" | "blackTheme" | "whiteTheme" | "bgImage"
  ) => {
    const _data = {
      'blueTheme': 'Dark Blue', 
      'blackTheme': 'Dark',
      'whiteTheme': 'Light', 
      'bgImage': 'Image Background',
    }
    return _data[e];
  };

  const clickToHideOnChangeHandler = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    // console.log("clickToHideOnChangeHandler: ", e);
    e.preventDefault();
    setSettingState(
      Object.assign({}, settingState, { clickToHide: !settingState.clickToHide })
    );
  };

  const renderClickToHideInput = () => {
    if(settingState.clickToHide) {
      return (
        <div className="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md bg-blue-600 border-transparent focus:outline-none"
          onClick={clickToHideOnChangeHandler}
        />
      );
    }
    return (
      <div
        className="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md focus:outline-none"
        onClick={clickToHideOnChangeHandler}
      />
    );
  }

  const clickToReplaceTheDefaultNewTabHandler = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    // console.log("clickToHideOnChangeHandler: ", e);
    e.preventDefault();
    setSettingState(
      Object.assign({}, settingState, {
        replaceTheDefaultNewTab: !settingState.replaceTheDefaultNewTab,
      })
    );
  };

  const renderReplaceTheDefaultNewTab = () => {
    if (settingState.replaceTheDefaultNewTab) {
      return (
        <div
          className="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md bg-blue-600 border-transparent focus:outline-none"
          onClick={clickToReplaceTheDefaultNewTabHandler}
        />
      );
    }
    return (
      <div
        className="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md focus:outline-none"
        onClick={clickToReplaceTheDefaultNewTabHandler}
      />
    );
  };

  const bookmarkViewOnChangeHandler = (e :React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    if(e.target.value === 'grid') window.confirm('Coming Soon!')
  };

  return (
    <>
      {settingVisibility ? (
        <Popup outClick={closeClickHandler}>
          <div className="w-full h-full p-5 border-blue-900 text-blue-900 relative box-border">
            <h1 className="text-3xl font-bold border-b-2 pb-2">Setting</h1>
            <div className="mt-5 w-full grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
              <div className="p-4 w-full max-w-xs mx-auto bg-white rounded-xl shadow-md">
                <label className="flex items-center space-x-3">
                  {renderClickToHideInput()}
                  <span className="text-gray-900 font-medium px-3 py-2">
                    Enable Click to hide
                  </span>
                </label>
              </div>
              <div className="p-4 w-full max-w-xs mx-auto bg-white rounded-xl shadow-md">
                <label className="flex items-center space-x-3">
                  {renderReplaceTheDefaultNewTab()}
                  <span className="text-gray-900 font-medium px-3 py-2">
                    Replace the default new tab
                  </span>
                </label>
              </div>
              <div className="p-4 w-full max-w-xs mx-auto bg-white rounded-xl shadow-md">
                <label className="flex items-center space-x-3">
                  <span className="text-gray-900 font-medium">Theme:</span>
                  <select
                    className="appearance-none px-3 py-2 border-b-2"
                    value="DEFAULT"
                    onChange={themeOnChangeHandler}
                  >
                    {/* 'blueTheme' | 'blackTheme' | 'whiteTheme' | 'bgImage' */}
                    {colorThemeChangedState ? (
                      <option value="DEFAULT">
                        {getThemeName(colorTheme)}
                      </option>
                    ) : (
                      <option value="DEFAULT">--Please select theme--</option>
                    )}
                    <option value="blueTheme">Dark Blue</option>
                    <option value="blackTheme">Dark</option>
                    <option value="whiteTheme">Light</option>
                    <option value="bgImage">Image Background</option>
                  </select>
                </label>
              </div>
              <div className="p-4 w-full max-w-xs mx-auto bg-white rounded-xl shadow-md">
                <label className="flex items-center space-x-3">
                  <span className="text-gray-900 font-medium">
                    Bookmarks View:
                  </span>
                  <select
                    className="appearance-none px-3 py-2 border-b-2"
                    onChange={bookmarkViewOnChangeHandler}
                  >
                    <option value="">--Please select View--</option>
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                  </select>
                </label>
              </div>
              {/* TODO: add option to select bg from unsplash */}
            </div>
            <div className="absolute bottom-5 left-2/4 -ml-16">
              <div
                className="w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
                onClick={closeClickHandler}
              >
                Close
              </div>
            </div>
          </div>
        </Popup>
      ) : (
        ""
      )}
    </>
  );
}

export default Setting;

import React from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

import Popup from '../Popup/Popup.component';
import {settingDialogueVisibility, settingSelector} from '../Recoil/setting.atom';
import {
  colorThemeSelector,
  colorThemeProp,
  colorThemeChangedSelector,
} from "../Recoil/color_theme.atom";
import { linksSelector } from "../Recoil/links_selector.atom";
import { groupSelector } from "../Recoil/group_selector.atom";
import Uploader from '../Uploader/Uploader.component';
import { importModuleVisibility } from '../Recoil/importModule.atom';
import {
  errorModuleVisibility,
  errorMessageAtom,
} from "../Recoil/errorModule.atom";

const Setting = () => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeSelector);
  const [colorThemeChangedState, setColorThemeChangedState] = useRecoilState(
    colorThemeChangedSelector
  );
  const [settingVisibility, setSettingVisibility] = useRecoilState(
    settingDialogueVisibility
  );
  const [settingState, setSettingState] = useRecoilState(settingSelector);
  const resetLinks = useResetRecoilState(linksSelector);
  const resetGroups = useResetRecoilState(groupSelector);
  const [importModuleVisibilityState, setImportModuleVisibilityState] = useRecoilState(importModuleVisibility);
  const setErrorVisibility = useSetRecoilState(errorModuleVisibility);
  const setErrorMessage = useSetRecoilState(errorMessageAtom);

  const closeClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if(e.target === e.currentTarget) {
      setImportModuleVisibilityState(false);
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
    // console.log(e.target.value);
    if(e.target.value === 'grid') window.confirm('Coming Soon!')
  };

  const resetClickHandler = () => {
    if (window.confirm("Are you sure about delete all saved tabs?")) {
      chrome.storage.sync.remove(["tabs", "groups"], function () {
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

  const downloadObject = (obj:{}, filename:string) => {
    var blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json;charset=utf-8",
    }).slice(2, -1);
    var url = URL.createObjectURL(blob);
    var elem = document.createElement("a");
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }

  const exportClickHandler = () => {
    if (window.confirm("Only tabs and links will be exported, theme settings will not.")) {
      console.log('export requested')
      chrome.storage.sync.get(
        [ "tabs", "visible", "view", "LVLPVisibility", "colorTheme", "setting", "groups" ],
        function (result) {
          console.log("get tabs from sync storage", result);
          downloadObject(result, "tabs.txt");
        }
      );
    } else {
      console.log("Abort!");
    }
  };
  
  const importClickHandler = () => {
    setImportModuleVisibilityState(true);
  };

  const validateNewState = (obj: any) => {
    const keys = [ "tabs", "visible", "view", "LVLPVisibility", "colorTheme", "setting", "groups", ];
    let result = true;
    keys.map(x => {
      result = obj[x] === undefined ? false : true; 
    })
    console.log(result)
    return result;
  }

  const handleUpload = (obj:{}) => {
    if(validateNewState(obj)) {
      // console.log('validated obj ')
      chrome.storage.sync.set(obj, function () {
        // console.log('sync storage set');
        location.reload();
      });
    } else {
      // console.log('not valid input')
      setErrorVisibility(true);
      setErrorMessage(
        "Invalid Input! Please copy paste the whole content from the file you exported from Dashboard before."
      );
    }
  };

  return (
    <>
      {settingVisibility ? (
        <Popup outClick={closeClickHandler}>
          <div className="w-full h-full p-5 border-blue-900 text-blue-900 relative box-border overflow-y-scroll">
            {importModuleVisibilityState?
              <Uploader handleUpload={handleUpload} />
              : ''
            }
            <h1 className="text-3xl font-bold border-b-2 pb-2">Setting</h1>
            <div className="mt-5 w-full grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">
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
                <label className="flex items-center space-x-3 flex-col lg:flex-row">
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
                <label className="flex items-center space-x-3 flex-col lg:flex-row">
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
            <div className="border-2 border-red-500 px-4 py-4 my-4 rounded-xl">
              <div className="w-full grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <button
                  onClick={exportClickHandler}
                  className={`w-24 text-center border-2 px-3 py-1 bg-white text-red-600 cursor-pointer text-xl font-bold hover:bg-white hover:text-red-500 hover:border-red-500 rounded-xl shadow-md inline-block`}
                >
                  Export
                </button>
                <button
                  onClick={importClickHandler}
                  className={`w-24 text-center border-2 px-3 py-1 bg-white text-red-600 cursor-pointer text-xl font-bold hover:bg-white hover:text-red-500 hover:border-red-500 rounded-xl shadow-md inline-block`}
                >
                  Import
                </button>
                <button
                  onClick={resetClickHandler}
                  className={`w-24 text-center border-2 px-3 py-1 bg-white text-red-600 cursor-pointer text-xl font-bold hover:bg-white hover:text-red-500 hover:border-red-500 rounded-xl shadow-md inline-block`}
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="h-12 text-center">
              <div
                className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
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

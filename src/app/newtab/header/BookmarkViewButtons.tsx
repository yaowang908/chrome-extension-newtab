import React from 'react'
import { useRecoilState, useRecoilValue } from "recoil";
import { nanoid } from "nanoid";

import { colorThemeSelector } from "../Recoil/color_theme.atom";
import setting from "../setting/setting";
import { settingDialogueVisibility } from "../Recoil/setting.atom";
import { listViewLeftPanelVisibilitySelector } from "../Recoil/bookmarks.selector";

const BookmarkViewButtons = () => {
  const colorTheme = useRecoilValue(colorThemeSelector);
  const [settingVisibility, setSettingVisibility] = useRecoilState(
    settingDialogueVisibility
  );
  const [listViewLeftPanelVisibility, setListViewLeftPanelVisibility] =
    useRecoilState(listViewLeftPanelVisibilitySelector);
  
  const settingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSettingVisibility(!settingVisibility);
  };

  const toggleLeftPanelClickHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // console.log('Toggle')
    setListViewLeftPanelVisibility(!listViewLeftPanelVisibility);
  }

  return (
    <div
      className={`w-full sm:w-96 grid grid-cols-2 gap-2 mb-4 ${setting.text[colorTheme]}`}
    >
      <button
        onClick={settingClickHandler}
        className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} text-lg`}
      >
        Setting
      </button>
      <button
        onClick={toggleLeftPanelClickHandler}
        className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} text-lg`}
      >
        Toggle Left Panel
      </button>
    </div>
  );
}

export default BookmarkViewButtons

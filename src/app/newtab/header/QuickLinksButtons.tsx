import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nanoid } from "nanoid";

import { colorThemeSelector } from "../Recoil/color_theme.atom";
import setting from "../setting/setting";

const QuickLinksButtons = () => {
  const colorTheme = useRecoilValue(colorThemeSelector);

  
  const settingClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    window.alert('Settings for quickLinks')
  };

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
        className={`${setting.text[colorTheme]} ${setting.headBorder[colorTheme]} text-lg`}
      >
        Toggle Main List
      </button>
    </div>
  );
};

export default QuickLinksButtons;

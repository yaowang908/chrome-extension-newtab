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
      className={`w-full sm:w-96 grid grid-cols-2 gap-2 mb-4`}
      style={{ color: `var(--textColor)` }}
    >
      <button
        onClick={settingClickHandler}
        className={`text-lg`}
        style={{
          borderColor: `var(--textColor)`,
          color: `var(--textColor)`,
        }}
      >
        Setting
      </button>
      <button
        className={`text-lg`}
        style={{
          borderColor: `var(--textColor)`,
          color: `var(--textColor)`,
        }}
      >
        Toggle Main List
      </button>
    </div>
  );
};

export default QuickLinksButtons;

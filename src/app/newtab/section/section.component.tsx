import React from 'react';
import { useRecoilValue } from "recoil";

import { colorThemeSelector, colorThemeProp } from "../Recoil/color_theme.atom";
import setting from '../setting/setting';

const Section:React.FC = props => {
  const colorTheme = useRecoilValue<colorThemeProp>(colorThemeSelector);

  return (
    <div className={`nt-section relative w-full h-full my-t border-r-2 last:border-0 ${setting.border[colorTheme]} ${setting.text[colorTheme]} px-2 overflow-y-scroll`}>
      {props.children}
    </div>
  )
}

export default Section;
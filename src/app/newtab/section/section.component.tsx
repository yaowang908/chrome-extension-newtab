import React from 'react';
import { useRecoilValue } from "recoil";

import { colorThemeSelector } from "../Recoil/color_theme.atom";
import setting from '../setting/setting';

const Section:React.FC = props => {
  const colorTheme = useRecoilValue<'blueTheme' | 'blackTheme' | 'whiteTheme'>(colorThemeSelector);

  return (
    <div className={`relative w-full my-t border-r-2 last:border-0 ${setting.border[colorTheme]} ${setting.text[colorTheme]} px-2 mt-4`}>
      {props.children}
    </div>
  )
}

export default Section;
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { LinkProps } from "./link.interfaces";
import { linksSelector } from '../../Recoil/links_selector.atom';
import { colorThemeSelector } from "../../Recoil/color_theme.atom";
import setting from '../../setting/setting';

const Link: React.FC<LinkProps> = ({id, link, imageUrl, title}: LinkProps) => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  // link: string;
  // imageUrl: string;
  // title: string;

  const removeCurrentLink = () => { setDataArr(dataArr?.filter(x => (x?.id !== id))) }

  const removeRecordClickHandler = () => {
    removeCurrentLink()
  }

  const openClickHandler = (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    chrome.tabs.create({
      active: true,
      url: link
    });
    removeCurrentLink()
  }

  return (
    <div className="w-full grid grid-cols-12 group" >
      <div className="col-span-1 w-6 h-6 bg-center bg-contain bg-no-repeat cursor-pointer mr-2" style={{backgroundImage: `url(${imageUrl})`}} ></div>
      <div className={`col-span-11 relative grid grid-cols-12 gap-1 ${setting.text[colorTheme]} cursor-pointer`}>
        <div className="col-span-12 group-hover:col-span-8 block whitespace-nowrap truncate">
          <a href="#" onClick={openClickHandler} target="_blank">{title}</a>
        </div>
        <div className="hidden group-hover:block group-hover:col-span-2"></div>
        <div className="hidden group-hover:grid col-span-2 inset-0 z-10 text-sm font-base grid-cols-2">
          <a href="#" onClick={openClickHandler} target="_blank" className="text-center text-xs grid place-items-center box-border">
            <svg viewBox="0 0 512 512" className={`w-4 h-4`} xmlns="http://www.w3.org/2000/svg" fill={`${setting.svgOpenColor[colorTheme]}`}><g><path d="m472 452c0 11.028-8.972 20-20 20h-392c-11.028 0-20-8.972-20-20v-392c0-11.028 8.972-20 20-20h176v-40h-176c-33.084 0-60 26.916-60 60v392c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60v-176h-40z"/><path d="m312 0v40h131.716l-321.858 321.858 28.284 28.284 321.858-321.858v131.716h40v-200z"/></g></svg>
          </a>
          <div className={`${setting.text[colorTheme]} text-white text-center text-xs grid place-items-center box-border`} onClick={removeRecordClickHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" className="w-4 h-4 text-red-900" fill={`${setting.svgTrashColor[colorTheme]}`}> <g> <path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z"/> <polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333"/> </g> </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Link;
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { LinkProps } from "./link.interfaces";
import { linksSelector } from '../../Recoil/links_selector.atom';
import { colorThemeSelector } from "../../Recoil/color_theme.atom";
import setting from '../../setting/setting';

const Link: React.FC<LinkProps> = ({id, link, imageUrl, title, preview = false}: LinkProps) => {
  const [dataArr, setDataArr] = useRecoilState(linksSelector);
  const colorTheme = useRecoilValue(colorThemeSelector);
  const linkTitle = React.useRef<HTMLDivElement>(null);
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

  const editClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // console.log('Clicked edit!')
    // DONE: rename the current clicked link
    if (linkTitle && linkTitle.current) {
      linkTitle.current.contentEditable = "true";
      linkTitle.current.focus();
      // highlight all current content
      window.getSelection()?.selectAllChildren( linkTitle.current );
    }
  };

  const renameCurrentLink = (newName: string) => {
    const newDataArr = dataArr ? 
                        [...dataArr].map(x => {
                          if(x.id === id) {
                            return Object.assign({}, x, { title: newName });
                          } else {
                            return x;
                          }
                        }) : 
                        undefined;
    // console.log('Save new name?', newDataArr)
    setDataArr(newDataArr);
  };

  const linkTitleOnBlurHandler = (el: React.FocusEvent<HTMLDivElement>) => {
    // DONE:
    let newName = el.currentTarget.innerText || "Group";
    // DONE: save new title, and remove contentEditable
    if (linkTitle && linkTitle.current) {
      linkTitle.current.contentEditable = "false";
      renameCurrentLink(newName);
    }

  };

  const linkTitleOnKeyDownHandler = (el: React.KeyboardEvent<HTMLDivElement>) => {
    if (el.keyCode === 13 || el.keyCode === 27) {
      // console.log("Enter! Or Escape!");
      el.currentTarget.blur();
    }
  };

  return (
    <div
      className={`grid grid-cols-12 group ${
        preview ? "border-2 border-yellow-200 bg-gray-300 w-64" : "w-full"
      }`}
    >
      <div
        className="col-span-1 w-6 h-6 bg-center bg-contain bg-no-repeat cursor-pointer mr-2"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div
        className={`col-span-11 relative grid grid-cols-12 gap-1 ${setting.text[colorTheme]} cursor-pointer`}
      >
        <div className="col-span-12 group-hover:col-span-8 block whitespace-nowrap truncate">
          <div
            onClick={openClickHandler}
            onBlur={linkTitleOnBlurHandler}
            onKeyDown={linkTitleOnKeyDownHandler}
            className="text-base"
            ref={linkTitle}
          >
            {title}
          </div>
        </div>
        <div className="hidden group-hover:block group-hover:col-span-1"></div>
        <div className="hidden group-hover:grid col-span-3 inset-0 z-10 text-sm font-base grid-cols-3">
          <a
            href="#"
            target="_blank"
            onClick={editClickHandler}
            className="text-center text-xs grid place-items-center box-border"
            title="Rename"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              className={`w-4 h-4`}
              fill={`${setting.svgOpenColor[colorTheme]}`}
            >
              <g>
                <path d="M234.667,512H192c-5.891,0-10.667-4.776-10.667-10.667s4.776-10.667,10.667-10.667h42.667 c5.891,0,10.667-4.776,10.667-10.667V32c0-5.891-4.776-10.667-10.667-10.667H192c-5.891,0-10.667-4.776-10.667-10.667 S186.109,0,192,0h42.667c17.673,0,32,14.327,32,32v448C266.667,497.673,252.34,512,234.667,512z" />
                <path d="M320,512h-42.667c-17.673,0-32-14.327-32-32V32c0-17.673,14.327-32,32-32H320 c5.891,0,10.667,4.776,10.667,10.667S325.891,21.333,320,21.333h-42.667c-5.891,0-10.667,4.776-10.667,10.667v448 c0,5.891,4.776,10.667,10.667,10.667H320c5.891,0,10.667,4.776,10.667,10.667S325.891,512,320,512z" />
              </g>
              <path d="M234.667,512H192c-5.891,0-10.667-4.776-10.667-10.667s4.776-10.667,10.667-10.667h42.667 c5.891,0,10.667-4.776,10.667-10.667V32c0-5.891-4.776-10.667-10.667-10.667H192c-5.891,0-10.667-4.776-10.667-10.667 S186.109,0,192,0h42.667c17.673,0,32,14.327,32,32v448C266.667,497.673,252.34,512,234.667,512z" />
              <path d="M320,512h-42.667c-17.673,0-32-14.327-32-32V32c0-17.673,14.327-32,32-32H320c5.891,0,10.667,4.776,10.667,10.667 S325.891,21.333,320,21.333h-42.667c-5.891,0-10.667,4.776-10.667,10.667v448c0,5.891,4.776,10.667,10.667,10.667H320 c5.891,0,10.667,4.776,10.667,10.667S325.891,512,320,512z" />
            </svg>
          </a>
          <a
            href="#"
            onClick={openClickHandler}
            target="_blank"
            className="text-center text-xs grid place-items-center box-border"
            title="Open in new tab"
          >
            <svg
              viewBox="0 0 512 512"
              className={`w-4 h-4`}
              xmlns="http://www.w3.org/2000/svg"
              fill={`${setting.svgOpenColor[colorTheme]}`}
            >
              <g>
                <path d="m472 452c0 11.028-8.972 20-20 20h-392c-11.028 0-20-8.972-20-20v-392c0-11.028 8.972-20 20-20h176v-40h-176c-33.084 0-60 26.916-60 60v392c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60v-176h-40z" />
                <path d="m312 0v40h131.716l-321.858 321.858 28.284 28.284 321.858-321.858v131.716h40v-200z" />
              </g>
            </svg>
          </a>
          <div
            className={`${setting.text[colorTheme]} text-white text-center text-xs grid place-items-center box-border`}
            onClick={removeRecordClickHandler}
            title="DELETE"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 384"
              className="w-4 h-4 text-red-900"
              fill={`${setting.svgTrashColor[colorTheme]}`}
            >
              <g>
                <path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z" />
                <polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Link;
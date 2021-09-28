import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { LinkProps } from "./link.interfaces";
import { linksSelector } from '../../Recoil/links_selector.atom';
import { colorThemeSelector } from "../../Recoil/color_theme.atom";
import setting from '../../setting/setting';
import { DraggableLinkPropsInterface } from './draggableLink.component';

const Link: React.FC<DraggableLinkPropsInterface> = ({
  id,
  link,
  imageUrl,
  title,
  dataArr,
  setDataArr,
  preview = false,
}: DraggableLinkPropsInterface) => {
  // const [dataArr, setDataArr] = useRecoilState(linksSelector);
  // DONE: make component accept generic type

  const colorTheme = useRecoilValue(colorThemeSelector);
  const linkTitle = React.useRef<HTMLDivElement>(null);

  const removeCurrentLink = () => {
    setDataArr(dataArr?.filter((x) => x?.id !== id));
  };

  const removeRecordClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    removeCurrentLink();
  };

  const openClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    chrome.tabs.create({
      active: false,
      url: link,
    });
    removeCurrentLink();
  };

  const openClickHandlerInSameTab = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // chrome.tabs.create({
    //   active: true,
    //   url: link,
    // });
    chrome.tabs.query(
      {currentWindow: true, active : true},
      function(tabArray){
        tabArray.forEach(tab => {
          if(tab?.id) {
            chrome.tabs.update(tab?.id, {
              url: link,
            });
          }

        })
      }
    )
    removeCurrentLink();
  };

  const editClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('Clicked edit!')
    // DONE: rename the current clicked link
    if (linkTitle && linkTitle.current) {
      linkTitle.current.contentEditable = "true";
      linkTitle.current.focus();
      // highlight all current content
      window.getSelection()?.selectAllChildren(linkTitle.current);
    }
  };

  const renameCurrentLink = (newName: string) => {
    const newDataArr = dataArr
      ? [...dataArr].map((x) => {
          if (x.id === id) {
            return Object.assign({}, x, { title: newName });
          } else {
            return x;
          }
        })
      : undefined;
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

  const linkTitleOnKeyDownHandler = (
    el: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (el.keyCode === 13 || el.keyCode === 27) {
      // console.log("Enter! Or Escape!");
      el.currentTarget.blur();
    }
  };

  return (
    <div
      className={`grid grid-cols-12 items-center group ${
        preview
          ? "border-2 border-yellow-200 bg-gray-300 w-96"
          : "w-full  md:w-4/5 lg:w-3/5"
      }`}
    >
      <div
        className="col-span-1 w-3 h-3 sm:w-6 sm:h-6 bg-center bg-contain bg-no-repeat cursor-pointer mr-2"
        style={{
          backgroundImage: `url(${
            imageUrl ? imageUrl : "https://via.placeholder.com/16"
          })`,
        }}
      ></div>
      <div
        className={`col-span-11 relative grid grid-cols-12 gap-1 cursor-pointer`}
        style={{
          color: `var(--textColor)`,
        }}
      >
        {/* <div className="hidden group-hover:block group-hover:col-span-1 "></div> */}
        <div className="hidden group-hover:grid group-hover:col-span-2 inset-0 text-sm font-base grid-cols-3">
          <div
            className={`text-white text-center text-xs grid place-items-center box-border`}
            style={{
              color: `var(--textColor)`,
            }}
            onClick={removeRecordClickHandler}
            title="DELETE"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 384"
              className="w-4 h-4 text-red-900"
              fill={`var(--cautionColor)`}
            >
              <g>
                <path d="M64,341.333C64,364.907,83.093,384,106.667,384h170.667C300.907,384,320,364.907,320,341.333v-256H64V341.333z" />
                <polygon points="266.667,21.333 245.333,0 138.667,0 117.333,21.333 42.667,21.333 42.667,64 341.333,64 341.333,21.333" />
              </g>
            </svg>
          </div>
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
              fill={`var(--textColor)`}
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
              fill={`var(--textColor)`}
            >
              <g>
                <path d="m472 452c0 11.028-8.972 20-20 20h-392c-11.028 0-20-8.972-20-20v-392c0-11.028 8.972-20 20-20h176v-40h-176c-33.084 0-60 26.916-60 60v392c0 33.084 26.916 60 60 60h392c33.084 0 60-26.916 60-60v-176h-40z" />
                <path d="m312 0v40h131.716l-321.858 321.858 28.284 28.284 321.858-321.858v131.716h40v-200z" />
              </g>
            </svg>
          </a>
        </div>
        <div className="col-span-12 group-hover:col-span-10 block whitespace-nowrap truncate">
          <div
            onClick={openClickHandlerInSameTab}
            onBlur={linkTitleOnBlurHandler}
            onKeyDown={linkTitleOnKeyDownHandler}
            className="text-base"
            ref={linkTitle}
          >
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Link;
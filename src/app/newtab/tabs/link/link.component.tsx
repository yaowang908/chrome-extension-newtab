import React from 'react';

import { LinkProps } from "./link.interfaces";

const Link: React.FC<LinkProps> = ({link, imageUrl, title}: LinkProps) => {
  // link: string;
  // imageUrl: string;
  // title: string;

  const clickHandler = () => {
    if (link) {
      chrome.tabs.create({url: link, active: true})
    }
    return false;
  }

  return (
    <div className="w-full h-full flex flex-row items-center" onClick={clickHandler}>
      <div className="w-6 h-6 bg-center bg-contain bg-no-repeat cursor-pointer mr-2" style={{backgroundImage: `url(${imageUrl})`}} ></div>
      <div className="text-white grid place-items-center cursor-pointer truncate">
        <a href={link} target="_blank" className="inline-block mx-auto whitespace-nowrap truncate">
          {title}  
        </a>
      </div>
    </div>
  )
}

export default Link;
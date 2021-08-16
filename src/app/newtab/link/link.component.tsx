import React from 'react';

import { LinkProps } from "./link.interfaces";

const Link: React.FC<LinkProps> = ({link, imageUrl, title}: LinkProps) => {
  // link: string;
  // imageUrl: string;
  // title: string;

  return (
    <div className="w-full h-full">
      <div className="w-full h-4/6 bg-center cursor-pointer" style={{backgroundImage: `url(${imageUrl})`}} onClick={() => window.open(link, '_blank')?.focus()}></div>
      <div className="text-white text-center cursor-pointer">
        <a href={link} className="inline-block lg:mt-3 mx-auto">
          {title}  
        </a>
      </div>
    </div>
  )
}

export default Link;
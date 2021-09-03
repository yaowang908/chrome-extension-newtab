import React from 'react'
import { useRecoilState } from 'recoil'

import { visibleSelector } from '../Recoil/visible.atom';
import images from '../../../assets/images';

const CustomBackground = () => {
  const [visible, setVisible] = useRecoilState(visibleSelector);
  
  const customBgClickHandler = () => {
    console.log("Single Click!");
    setVisible(!visible);
  };

  const customBgDoubleClickHandler = () => {
    console.log("Double Click!");
    setVisible(!visible);
  };

  return (
    <div
      className={`w-full h-full absolute top-0 left-0 overflow-hidden z-10 bg-cover ${visible ? 'filter blur-lg' : ''}`}
      style={{ backgroundImage: `url(${images[0].url})` }}
      onClick={customBgClickHandler}
      onDoubleClick={customBgDoubleClickHandler}
    >
      {/* <img className="w-full h-full" src={images[0].url} alt={images[0].name} /> */}
    </div>
  );
}

export default CustomBackground
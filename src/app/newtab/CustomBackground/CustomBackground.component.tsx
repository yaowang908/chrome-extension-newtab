import React from 'react'
import { useRecoilState } from 'recoil'
import parse from 'html-react-parser'

import { visibleSelector } from '../Recoil/visible.atom'
import images from '../../../assets/images'

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
  // DONE: add credits
  
  return (
    <div
      className={`w-full h-full absolute top-0 left-0 overflow-hidden z-10 bg-cover ${visible ? 'filter blur-lg' : ''}`}
      style={{ backgroundImage: `url(${images[0].url})` }}
      onClick={customBgClickHandler}
      onDoubleClick={customBgDoubleClickHandler}
    >
      {/* <img className="w-full h-full" src={images[0].url} alt={images[0].name} /> */}
      <div className={`absolute bottom-5 left-5 text-lg text-gray-500`}>
        {parse(images[0].credit)}
      </div>
    </div>
  );
}

export default CustomBackground
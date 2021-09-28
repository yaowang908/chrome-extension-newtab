import React from 'react'
import { useRecoilState } from 'recoil'
import parse from 'html-react-parser'

import { collapseAtom } from "../Recoil/collapse.atom";

const CustomBackground = () => {
  const [collapseState, setCollapseState] = useRecoilState(collapseAtom);
  
  const customBgClickHandler = () => {
    console.log("Single Click!");
    setCollapseState(false);
  };

  const customBgDoubleClickHandler = () => {
    console.log("Double Click!");
  };
  // DONE: add credits
  
  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 overflow-hidden bg-gray-100`}
      style={{
        backgroundColor: "white",
        zIndex: -1,
        backgroundImage: `url( "https://source.unsplash.com/random/1920x1080?dark,city" )`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={customBgClickHandler}
      onDoubleClick={customBgDoubleClickHandler}
    >
      BG
    </div>
  );
}

export default CustomBackground
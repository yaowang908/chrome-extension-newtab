import React from 'react'

const QuickLinkBox = () => {

  return (
    <div
      className="relative quickLinkBox pb-full border-2 border-white box-border color-white cursor-pointer box-border group z-20"
      style={{ width: "10vmin", height: "10vmin" }}
    >
      <div className="text-vertical absolute w-6 h-full top-0 -right-6 box-border text-left transform origin-bottom-left bg-opacity-0 ease-in-out delay-150 duration-300 opacity-0 z-0 group-hover:opacity-100 group-hover:bg-opacity-10 text-lg ">
        ...
      </div>
    </div>
  );
}

export default QuickLinkBox

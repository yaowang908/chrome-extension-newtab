import React from 'react'

const Popup: React.FunctionComponent = (props) => {
  return (
    <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0 m-auto bg-black bg-opacity-70 z-50">
      <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 m-auto bg-gray-100">
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
import React from 'react'

import Popup from '../Popup/Popup.component';

const Setting = () => {
  return (
    <Popup>
      <div className="w-full h-full p-5 border-blue-900 text-blue-900 relative box-border">
        <h1 className="text-3xl font-bold border-b-2 pb-2">Setting</h1>
        <div className="mt-5 w-full grid grid-cols-1 sm:grid-cols-2">
          <div className="p-4 w-full max-w-xs mx-auto bg-white rounded-xl shadow-md">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="clickToHide"
                value="1"
                className="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
              />
              <span className="text-gray-900 font-medium px-3 py-2">
                Enable Click to hide
              </span>
            </label>
          </div>
          <div className="p-4 w-full max-w-xs mx-auto bg-white rounded-xl shadow-md">
            <label className="flex items-center space-x-3">
              <span className="text-gray-900 font-medium">Theme:</span>
              <select className="appearance-none px-3 py-2 border-b-2">
                {/* 'blueTheme' | 'blackTheme' | 'whiteTheme' | 'bgImage' */}
                <option value="">--Please select theme--</option>
                <option value="blueTheme">Dark Blue</option>
                <option value="blackTheme">Dark</option>
                <option value="whiteTheme">Light</option>
                <option value="bgImage">Image Background</option>
              </select>
            </label>
          </div>
        </div>
        <div className="absolute bottom-5 left-2/4 -ml-16">
          <div className="w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold">
            Close
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default Setting;

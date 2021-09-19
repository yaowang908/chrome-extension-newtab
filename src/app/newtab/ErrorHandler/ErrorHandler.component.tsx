import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  errorModuleVisibility,
  errorMessageAtom,
} from "../Recoil/errorModule.atom";

const ErrorHandler:React.FC = () => {
  const [visibility, setVisibility] = useRecoilState(errorModuleVisibility);
  const errorMessage = useRecoilValue(errorMessageAtom);

  const outClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // console.log('out click!')
    if (e.target === e.currentTarget) {
      setVisibility(false);
    }
  };

  return (
    <>
      {visibility ? (
        <div
          className="fixed w-full h-full top-0 bottom-0 left-0 right-0 m-auto bg-black bg-opacity-70"
          style={{ zIndex: 100 }}
          onClick={outClick}
        >
          <div className="absolute bg-gray-100 h-auto w-2/4 max-h-96 max-w-96 left-2/4 top-2/4 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">
            <div className="text-red-700 text-3xl text-center py-2 border-b-2 border-red-700 font-bold">
              Error
            </div>
            <div className="py-4 px-6 h-auto text-lg">{errorMessage}</div>
            <div className="h-12 text-center mb-4">
              <div
                className="inline-block w-32 text-center border-2 px-6 py-2 bg-blue-900 text-white cursor-pointer text-2xl font-bold"
                onClick={outClick}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ErrorHandler

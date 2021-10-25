import React from 'react'
import { useRecoilValue } from 'recoil'

import { loadingModuleVisibility } from '../Recoil/loading.selector'

const Loading = () => {
  const visibility = useRecoilValue(loadingModuleVisibility);

  const debug = false;

  return (
    <>
      {visibility || debug ? (
        <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0 m-auto bg-black bg-opacity-70 z-50">
          <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 m-auto">
            <div className="w-full h-full grid grid-cols-1 grid-rows-1 place-items-center">
              <div className="lds-dual-ring"></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Loading
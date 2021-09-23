import React from 'react'
import { useRecoilValue, useRecoilState } from "recoil";

import {
  QuickLinkEditorVisibility,
  QuickLinkEditorMode,
} from "../Recoil/quicklinks.atom";
import Popup from '../Popup/Popup.component'

const EditQuickLink = () => {
  const [visibility, setVisibility] = useRecoilState(QuickLinkEditorVisibility);
  const mode = useRecoilValue(QuickLinkEditorMode);

  const closeClickHandler = () => {
    setVisibility(!visibility);
  };

  return (
    <>
      {
        visibility
        ? (
          <Popup outClick={closeClickHandler}>
            <div className="w-full h-full p-5 border-blue-900 text-blue-900 relative box-border overflow-y-scroll">
              <h1 className="text-3xl font-bold border-b-2 pb-2">{mode === 'new' ? 'New Link' : 'Edit'}</h1>
              <div className="mt-5 w-full grid grid-cols-1 gap-2 sm:gap-5 md:grid-cols-2">
                <div className="p-4 w-full max-w-xs mx-auto bg-white rounded-xl shadow-md">
                  <label className="flex items-center space-x-3">
                    <span className="text-gray-900 font-medium px-3 py-2">
                      Enable Click to hide
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </Popup>
        )
        : ''
      }
    </>
  )
}

export default EditQuickLink

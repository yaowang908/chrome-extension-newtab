import React from 'react'
import { useSetRecoilState } from "recoil";

import {
  QuickLinkEditorVisibility,
  QuickLinkEditorMode,
} from "../Recoil/quicklinks.atom";

const AddQuickLink = () => {
  const setVisibility = useSetRecoilState(QuickLinkEditorVisibility);
  const setMode = useSetRecoilState(QuickLinkEditorMode);

  return (
    <div
      className="square_err quickLinkBox border-2 border-white color-white cursor-pointer grid place-items-center"
      style={{ width: "10vmin", height: "10vmin" }}
    >
      <div
        className="relative cross group cursor-pointer"
        style={{ width: "6vmin", height: "6vmin" }}
        onClick={() => {setVisibility(true); setMode('new');}}
      >
        <div
          className="cross-v bg-gray-100 absolute left-1/2 group-hover:bg-blue-800"
          style={{ width: "1vmin", height: "6vmin", marginLeft: "-0.5vmin" }}
        ></div>
        <div
          className="cross-h bg-gray-100 absolute top-1/2 group-hover:bg-blue-800"
          style={{ width: "6vmin", height: "1vmin", marginTop: "-0.5vmin" }}
        ></div>
      </div>
    </div>
  );
}

export default AddQuickLink

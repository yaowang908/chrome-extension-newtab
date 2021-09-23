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
      className="cross border-2 cursor-pointer grid place-items-center"
      style={{
        width: "10vmin",
        height: "10vmin",
        borderColor: "var(--textColor)",
        color: "var(--textColor)",
      }}
      onClick={() => {
        setVisibility(true);
        setMode("new");
      }}
    >
      <div
        className="relative cursor-pointer"
        style={{ width: "6vmin", height: "6vmin" }}
      >
        <div
          className="cross-arm absolute left-1/2"
          style={{
            width: "1vmin",
            height: "6vmin",
            marginLeft: "-0.5vmin",
          }}
        ></div>
        <div
          className="cross-arm absolute top-1/2"
          style={{
            width: "6vmin",
            height: "1vmin",
            marginTop: "-0.5vmin",
          }}
        ></div>
      </div>
    </div>
  );
}

export default AddQuickLink

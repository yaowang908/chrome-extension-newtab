import React from 'react'
import { useRecoilValue } from "recoil";

import Bookmark from "../List/Bookmark.component";
import GridFolderView from "../Grid/GridFolderView";
import { listViewLeftPanelVisibilitySelector as mainListVisibility } from "../../Recoil/bookmarks.selector";


const GridView = () => {
  const mainListVisibilityState = useRecoilValue(mainListVisibility);
  if (mainListVisibilityState) {
    return (
      <>
        <div className="overflow-x-hidden overflow-y-scroll lg:col-span-3 relative">
          <Bookmark />
        </div>
        <div className="lg:col-start-4 lg:col-span-3">
          <GridFolderView />
        </div>
      </>
    );
  }
  return (
    <div className="col-span-full">
      <div className="max-w-5xl mx-auto">
        <GridFolderView />
      </div>
    </div>
  );
}

export default GridView

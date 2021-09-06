import React from 'react'
import { useRecoilValue } from 'recoil';

import Bookmark from '../List/Bookmark.component';
import ListFolderView from '../List/ListFolderView';
import { listViewLeftPanelVisibilitySelector } from "../../Recoil/bookmarks.selector";

const ListView = () => {
  const listViewLeftPanelVisibility = useRecoilValue(
    listViewLeftPanelVisibilitySelector
  );
  if(listViewLeftPanelVisibility) {
    return (
      <>
        <div className="overflow-x-hidden overflow-y-scroll lg:col-span-3 relative">
          <Bookmark />
        </div>
        <div className="lg:col-start-4 lg:col-span-3">
          <ListFolderView />
        </div>
      </>
    );
  }
  return (
    <div className="col-span-full">
      <div className="max-w-7xl">
        <ListFolderView />
      </div>
    </div>
  );
}

export default ListView

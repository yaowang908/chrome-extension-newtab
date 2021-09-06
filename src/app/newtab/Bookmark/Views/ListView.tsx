import React from 'react'

import Bookmark from '../List/Bookmark.component';
import ListFolderView from '../List/ListFolderView';

const ListView = () => {
  return (
    <>
      <div className="overflow-x-hidden overflow-y-scroll lg:col-span-4">
        <Bookmark />
      </div>
      <div className="lg:col-start-5 lg:col-span-2">
        <ListFolderView />
      </div>
    </>
  );
}

export default ListView

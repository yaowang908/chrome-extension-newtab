import React from 'react'

import Bookmark from '../Bookmark.component';
import FolderView from '../FolderView.component';

const ListView = () => {
  return (
    <>
      <div className="h-5/6 overflow-x-hidden overflow-y-scroll lg:col-span-4">
        <Bookmark />
      </div>
      <div className="lg:col-start-5 lg:col-span-2">
        <FolderView data={{}}/>
      </div>
    </>
  );
}

export default ListView

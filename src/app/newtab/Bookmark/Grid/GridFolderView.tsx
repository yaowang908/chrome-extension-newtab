import React, { ReactElement } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { nanoid } from "nanoid";

import {
  bookmarkSelector,
  BookmarkFolder as BookmarkFolderType,
  BookmarkElement as BookmarkElementType,
  selectedFolderSelector,
} from "../../Recoil/bookmarks.selector";
import Section from "../../section/section.component";
import { settingSelector } from "../../Recoil/setting.atom";
import { bookmarkClickHandler } from "../../Helper/openURLInCurrentTab";


const GridFolderView = () => {
  const [selectedFolder, setSelectedFolder] = useRecoilState(
    selectedFolderSelector
  );

  React.useEffect(() => {
    chrome.storage.sync.get(["selectedFolder"], function (result) {
      if (result.selectedFolder) {
        setSelectedFolder(result.selectedFolder);
      }
    });
  }, []);

  const renderBookmarkFolder = (
    bookmarksData: BookmarkElementType | BookmarkFolderType | undefined
  ): ReactElement => {
    if (bookmarksData === undefined) {
      return (
        <div className="px-2">
          <div className="px-4 py-2 font-bold text-lg bg-blue-900">
            No folder selected!
          </div>
        </div>
      );
    }
    if ("url" in bookmarksData) {
      return (
        <div
          id={bookmarksData.id}
          key={nanoid()}
          className="text-base px-2 my-1 cursor-pointer"
          onClick={() => {
            bookmarkClickHandler(bookmarksData.url);
          }}
        >
          {bookmarksData.title
            ? bookmarksData.title
            : `(==empty title==) ${bookmarksData.url}`}
        </div>
      );
    } else {
      return (
        <div key={nanoid()} className="px-4">
          <div className="px-4 py-2 font-bold text-lg bg-blue-900 text-white border-b-2 border-gray-100">
            {bookmarksData.title}
          </div>
          {bookmarksData.children?.map((ele) => {
            return renderBookmarkFolder(ele);
          })}
        </div>
      );
    }
  };

  return (
    <Section>
      <div className={`grid grid-cols-4 w-full`}>
        {renderBookmarkFolder(selectedFolder)}
      </div>
    </Section>
  );
};

export default GridFolderView;
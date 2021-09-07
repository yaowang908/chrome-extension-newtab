import React, { ReactElement } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { nanoid } from 'nanoid';

import Section from '../../section/section.component'
import {
  bookmarkSelector,
  BookmarkFolder as BookmarkFolderType,
  BookmarkElement as BookmarkElementType,
  selectedFolderSelector,
} from "../../Recoil/bookmarks.selector";
import {bookmarkClickHandler} from '../../Helper/openURLInCurrentTab'

const Bookmark = () => {
  const [bookmark, setBookmark] = useRecoilState(bookmarkSelector);
  const setSelectedFolder = useSetRecoilState(selectedFolderSelector);

  // format bookmarks to fit the type in bookmarkSelector
  const getBookmarks = (
    bookmarkNode: any
  ): (BookmarkFolderType | BookmarkElementType) => {
    if (bookmarkNode.children) {
      const _children = bookmarkNode?.children.map((x: any) => {
        return getBookmarks(x);
      });

      return {
        dateAdded: bookmarkNode?.dateAdded,
        dateGroupModified: bookmarkNode?.dateGroupModified,
        id: bookmarkNode?.id,
        index: bookmarkNode?.index,
        title: bookmarkNode?.title,
        parentId: bookmarkNode?.parentId,
        children: _children,
      };
    }
    return {
      dateAdded: bookmarkNode?.dateAdded,
      id: bookmarkNode?.id,
      index: bookmarkNode?.index,
      title: bookmarkNode?.title,
      parentId: bookmarkNode?.parentId,
      url: bookmarkNode?.url,
    };
  };

  React.useEffect(() => {
    // get bookmarks
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      // console.log(bookmarkTreeNodes)
      const [_bookmarksBar, _otherBookmarks] = bookmarkTreeNodes[0].children || [[],[]];
      const bookmarksBar = getBookmarks(_bookmarksBar);
      const otherBookmarks = getBookmarks(_otherBookmarks);
      // console.log("BookmarksBar: ", getBookmarks(_bookmarksBar));
      // console.log("OtherBookmarks: ", getBookmarks(_otherBookmarks));

      if(bookmarksBar && otherBookmarks) {
        setBookmark({BookmarksBar: bookmarksBar, OtherBookmarks: otherBookmarks})
      }
    });
  }, []);

  // const bookmarkClickHandler = (newUrl: string) => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     const tab = tabs[0];
  //     if(tab.id) {
  //       chrome.tabs.update(tab.id, { url: newUrl });
  //     }
  //   });
  // };

  const renderBookmarks = (bookmarksData: (BookmarkElementType | BookmarkFolderType | undefined)): ReactElement => {
    if(bookmarksData === undefined) return (<></>);
    if ('url' in bookmarksData) {
      if(bookmarksData.url.includes('javascript')) {
        // console.log(bookmarksData.title)
        // this is a bookmarklet
        const onClickHandler = () => {
          window.alert('Bookmarklet only works on specific pages which match the URLs in the code')
        };
        return (
          <div
            id={bookmarksData.id}
            key={nanoid()}
            className="text-base px-2 my-1 cursor-pointer"
            onClick={onClickHandler}
          >
            Bookmarklet: {bookmarksData.title}
          </div>
        );
      }
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
    } else if (bookmarksData.parentId === "0") {
      // this is the root folder
      return (
        <div key={nanoid()} className="border-b-2 border-gray-100 px-2">
          {bookmarksData.children?.map((ele) => {
            return renderBookmarks(ele);
          })}
        </div>
      );
    } else {
      return (
        <div
          key={nanoid()}
          className="border-b-2 border-gray-100 bg-blue-900 px-2 py-1 font-bold text-base cursor-pointer text-white"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            setSelectedFolder(bookmarksData);
          }}
        >
          Folder: {bookmarksData.title}
        </div>
      );
    }
  };

  return <Section>{renderBookmarks(bookmark.BookmarksBar)}</Section>;
}

export default Bookmark;

import React from 'react'
import { useRecoilState } from 'recoil'

import Section from '../section/section.component'
import {
  bookmarkSelector,
  BookmarkFolder as BookmarkFolderType,
  BookmarkElement as BookmarkElementType,
} from "../Recoil/bookmarks.selector";

const Bookmark = () => {
  const [bookmark, setBookmark] = useRecoilState(bookmarkSelector);

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
      console.log("BookmarksBar: ", getBookmarks(_bookmarksBar));
      console.log("OtherBookmarks: ", getBookmarks(_otherBookmarks));

      if(bookmarksBar && otherBookmarks) {
        setBookmark({BookmarksBar: bookmarksBar, OtherBookmarks: otherBookmarks})
      }
    });
  }, []);

  return (
    <Section>
      BOOKMARK
    </Section>
  )
}

export default Bookmark;

import React from "react";
import { useRecoilValue } from "recoil";

import {
  bookmarkSelector,
  BookmarkFolder as BookmarkFolderType,
  BookmarkElement as BookmarkElementType,
} from "../../Recoil/bookmarks.selector";
import Section from "../../section/section.component";

interface gridViewProps {
  data: BookmarkFolderType | BookmarkElementType | {};
}

const GridFolderView = ({ data }: gridViewProps) => {
  return <Section>GridFolderView</Section>;
};

export default GridFolderView;
import React from 'react'
import { useRecoilValue } from "recoil"

import {
  bookmarkSelector,
  BookmarkFolder as BookmarkFolderType,
  BookmarkElement as BookmarkElementType,
} from "../Recoil/bookmarks.selector"
import Section from '../section/section.component'
import { settingSelector } from "../Recoil/setting.atom"

interface listGridViewProps {
  data: BookmarkFolderType | BookmarkElementType | {};
}

const FolderView = ({ data }: listGridViewProps) => {
  const view = useRecoilValue(settingSelector).bookmarkView;

  return <Section>{view === 'grid' ? <GridFolderView data={data}/> : <ListFolderView data={data}/>}</Section>;
};

export default FolderView;


const ListFolderView = ({ data }: listGridViewProps) => {

  return (
    <>
      ListFolderView
    </>
  )
};

const GridFolderView = ({ data }: listGridViewProps) => {
  return (
    <>
      GridFolderView
    </>
  );
};
import React from 'react';
import { useRecoilValue } from 'recoil';

import GridView from './GridView';
import ListView from './ListView';
import { settingSelector } from '../../Recoil/setting.atom';

const BookmarkView = () => {

  const setting = useRecoilValue(settingSelector);

  return <>{setting?.bookmarkView === "grid" ? <GridView /> : <ListView />}</>;
}

export default BookmarkView;

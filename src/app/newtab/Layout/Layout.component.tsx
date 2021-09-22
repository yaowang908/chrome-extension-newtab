import React from 'react'
import { useRecoilState, useRecoilValue } from "recoil"

import { Header } from "../header";
import Section from "../section/section.component";
import TabsSection from "../tabs";
import { colorThemeSelector } from "../Recoil/color_theme.atom";
import setting from "../setting/setting";
import { Group } from "../Group/Group.component";
import { visibleSelector } from "../Recoil/visible.atom";
import CustomBackground from "../CustomBackground/CustomBackground.component";
import Setting from "../setting/Setting.component";
import {
  settingDialogueVisibility,
  settingSelector,
} from "../Recoil/setting.atom";
import { viewSelector } from "../Recoil/view.atom";
import BookmarkView from "../Bookmark/Views";
import EditGroup from "../Group/EditGroup.component";
import ErrorHandler from "../ErrorHandler/ErrorHandler.component";
import QuickLinks from "../QuickLinks/QuickLinks.component";
import { VerticalHeader } from '../header/VerticalHeader.component';

const Layout:React.FC = () => {
  const view = useRecoilValue(viewSelector);

  const viewRenderLeft = () => {
    if (view === "Dashboard") {
      return (
        <div className="overflow-x-hidden overflow-y-scroll px-12 py-24 w-full h-full sm:w-4/6 md:w-5/6">
          <TabsSection />
        </div>
      );
    }
    if (view === "Bookmark") {
      return <BookmarkView />;
    }
    if (view === "QuickLinks") {
      return <QuickLinks />;
    }
  }

  const viewRenderRight = () => {
    if (view === "Dashboard") {
      return (
        <div className="p-12 w-full h-full grid place-items-center">
          <Group />
        </div>
      );
    }
    if (view === "Bookmark") {
      return <BookmarkView />;
    }
    if (view === "QuickLinks") {
      return <QuickLinks />;
    }
  }

  return (
    <div className="bg w-full h-screen relative">
      <VerticalHeader />
      <div className="layer h-screen w-auto absolute z-10 top-0 right-0 bottom-0 left-24">
        {viewRenderLeft()}
      </div>
      <div className="reserve h-screen w-0 sm:w-3/6 absolute z-20 top-0 right-0 bottom-0 left-auto">
        {viewRenderRight()}
      </div>
    </div>
  );
}

export default Layout
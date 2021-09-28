import React from 'react'
import { useRecoilValue } from "recoil"

import TabsSection from "../tabs";
import { Group } from "../Group/Group.component";
import { viewSelector } from "../Recoil/view.atom";
import QuickLinks from "../QuickLinks/QuickLinks.component";
import { VerticalHeader } from '../header/VerticalHeader.component';
import DashboardButtons from "../header/DashboardButtons";
import { Helmet } from "react-helmet";

const Layout: React.FC = () => {
  const view = useRecoilValue(viewSelector);

  const dashboardView = () => {
    return (
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <div className="layer h-screen w-auto absolute z-10 top-0 right-0 bottom-0 left-24">
          <div className="overflow-x-hidden overflow-y-scroll px-12 w-full h-full sm:w-4/6 md:w-5/6">
            <div className="h-24 w-full mb-3">
              <DashboardButtons />
            </div>
            <div className="-mt-1">
              <TabsSection />
            </div>
          </div>
        </div>
        <div className="reserve h-screen w-0 sm:w-3/6 absolute z-20 top-0 right-0 bottom-0 left-auto">
          <div className="overflow-x-hidden overflow-y-scroll px-12 w-full h-full">
            <div className="h-24 w-full mb-3"></div>
            <Group />
            <div className="h-24 w-full"></div>
          </div>
        </div>
      </>
    );
  }

  const quickLinksView = () => {
    return (
      <>
        <Helmet>
          <title>QuickLinks</title>
        </Helmet>
        <div className="layer h-screen w-auto absolute z-10 top-0 right-0 bottom-0 left-24">
          <div className="overflow-x-hidden overflow-y-scroll px-24 w-full h-full">
            <div className="h-24 w-full mb-3"></div>
            <div className="-mt-1">
              <QuickLinks />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg w-full h-screen relative">
      <VerticalHeader />
      {view === "Dashboard" ? dashboardView() : ""}
      {view === "QuickLinks" ? quickLinksView() : ""}
    </div>
  );
}

export default Layout;

import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { Header } from "./header";
import Section from "./section/section.component";
import TopSites from "./topsites/topsites.component";
import TabsSection from "./tabs";
import { colorThemeSelector } from "./Recoil/color_theme.atom";
import setting from './setting/setting';

import "../../style/styles.css";
import { Group } from "./Group/Group.component";
import { visibleSelector } from "./Recoil/visible.atom";
import CustomBackground from "./CustomBackground/CustomBackground.component";
import Setting from "./setting/Setting.component";
import { settingDialogueVisibility } from "./Recoil/setting.atom";
import { viewSelector } from "./Recoil/view.atom";
import BookmarkView from "./Bookmark/Views";

const App: React.FC = () => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeSelector);
  const visible = useRecoilValue(visibleSelector);
  const view = useRecoilValue(viewSelector);
  const settingVisibility = useRecoilValue(settingDialogueVisibility)
  // TODO: one of the three columns can be used a container for important links to preserve

  React.useEffect(() => {
    setColorTheme('blackTheme');
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`w-full h-screen relative ${setting.bg[colorTheme]} p-12 flex flex-col overflow-hidden box-border`}
      >
        <Setting />
        <Header />
        <div
          className={`flex-auto z-40 ${
            visible ? "grid" : "hidden"
          } transition duration-1000 ease-in-out grid-cols-1 md:grid-cols-2 lg:grid-cols-6`}
        >
          {view === "Dashboard" ? (
            <>
              <div className="h-5/6 overflow-x-hidden overflow-y-scroll lg:col-span-4">
                <TabsSection />
              </div>
              <div className="lg:col-start-5 lg:col-span-2">
                <Group />
              </div>
              {/* <TopSites /> */}
            </>
          ) : (
            <BookmarkView />
          )}
        </div>
        <CustomBackground />
      </div>
    </DndProvider>
  );
};

export default App;

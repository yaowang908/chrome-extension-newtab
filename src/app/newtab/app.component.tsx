import React from "react";
import { useRecoilState } from "recoil";
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

const App: React.FC = () => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeSelector);
  // TODO: one of the three columns can be used a container for important links to preserve

  React.useEffect(() => {
    setColorTheme('blackTheme');
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`w-full min-h-screen ${setting.bg[colorTheme]} p-12 flex flex-col`}>
        <Header />
        <div className="flex-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <TabsSection />
          <Group />
          <Section>Column 3</Section>
          {/* <TopSites /> */}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;

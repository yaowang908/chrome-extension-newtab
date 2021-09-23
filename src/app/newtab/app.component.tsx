import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import "../../style/styles.css";
import Setting from "./setting/Setting.component";
import EditGroup from "./Group/EditGroup.component";
import ErrorHandler from "./ErrorHandler/ErrorHandler.component";
import Layout from "./Layout/Layout.component";
import EditQuickLink from "./QuickLinks/EditQuickLink.component";

const App: React.FC = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`w-full h-screen relative p-0 overflow-hidden box-border`}
      >
        <ErrorHandler />
        <Setting />
        <EditGroup />
        <EditQuickLink />
        <Layout />
      </div>
    </DndProvider>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom";

import { Header } from "./newtab/header";
import Section from "./newtab/section/section.component";
import TopSites from "./newtab/topsites/topsites.component";
import TabsSection from "./newtab/tabs";


import "../style/styles.css";

const App: React.FC = () => {
  

  return (
    <div className="w-full h-screen bg-blue-900 p-12">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
        <TabsSection />
        <TopSites />
        <Section>Column 3</Section>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app-root"));

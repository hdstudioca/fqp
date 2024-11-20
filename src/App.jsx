import React from "react";
import Header from "./components/Header.jsx";

import Sidebar from "./components/Sidebar.jsx";
import FenceTable from "./components/FenceTable.jsx";
import GateTable from "./components/GateTable.jsx";
import LabourTable from "./components/LabourTable.jsx";

export default function App() {
  return (
    <div className="relative flex flex-col h-screen bg-background overflow-hidden">
      <Header />
      <div className="flex flex-grow h-full">
        <Sidebar />
        <div className="flex-grow bg-gray-100 overflow-auto">
          <div className="p-4 min-h-0 pb-[25vh]">
            <FenceTable initialTableName="Fence" />
            <GateTable initialTableName="Gate" />
            <LabourTable initialTableName="Labour" />
          </div>
        </div>
      </div>
    </div>
  );
}

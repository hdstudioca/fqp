import React, { useState } from "react";
import fittings from "../JSON/fittings.json";

const Sidebar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeGrid, setActiveGrid] = useState(null);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
    setActiveGrid(null);
  };

  const toggleGrid = (grid) => {
    setActiveGrid(activeGrid === grid ? null : grid);
  };

  const fittingKeys = Object.keys(fittings).map((key) => {
    return key; // Returns each key
  });
  return (
    <div className="relative">
      {/* Categories Menu */}
      <div className="w-64 h-full bg-gray-100 text-center">
        
          <div
            className="bg-zinc-400 cursor-pointer p-2 hover:bg-zinc-500 active:bg-gray-950 active:bg-opacity-70"
            onClick={() => toggleSubmenu("fittings")}
          >
            Fittings
          </div>
        

        {activeSubmenu === "fittings" && (
          <div className="h-lg:max-h-96 max-h-64 overflow-auto">
            {fittingKeys.map((key) => (
              <div
                key={key}
                className="bg-gray-200 cursor-pointer p-2 hover:bg-gray-300 active:bg-gray-950 active:bg-opacity-20"
                onClick={() => toggleGrid(key)}
              >
                {key.replace(/([A-Z]|\d\d[A-Z])/g, " $1")}{" "}
              </div>
            ))}
          </div>
        )}
        <div className="bg-zinc-400 cursor-pointer p-2 hover:bg-zinc-500 active:bg-gray-950 active:bg-opacity-70">
          Pipe
        </div>
        <div className="bg-zinc-400 cursor-pointer p-2 hover:bg-zinc-500 active:bg-gray-950 active:bg-opacity-70">
          Mesh
        </div>
      </div>

      {/* Submenu as a Sidebar */}
      {activeGrid && (
        <div
          id="overflowDiv"
          className="absolute top-0 left-64 w-64 h-80 resize-y borde bg-white shadow-md overflow-auto"
        >
          <div className="grid grid-cols-2 text-sm">
            <div className="font-bold text-left m-2">Item Number</div>
            <div className="font-bold text-left m-2">Description</div>

            {/* Check if the category is proClamps or privacySlats */}
            {activeGrid === "ProClamps" || activeGrid === "PrivacySlats"
              ? // Handle Nested Structure
                Object.keys(fittings[activeGrid][0]).map((groupKey) => (
                  <React.Fragment key={groupKey}>
                    {/* Subgroup Header */}
                    <div className="col-span-2 font-bold bg-gray-200 text-left m-2">
                      {groupKey.replace(/([A-Z]|\d\d[A-Z])/g, " $1")}{" "}
                      {/* Format key name */}
                    </div>
                    {}
                    {/* Items in the subgroup */}
                    {fittings[activeGrid][0][groupKey].map((fitting) => (
                      <React.Fragment key={fitting["ItemNumber"]}>
                        <div className="text-left m-2">
                          {fitting["ItemNumber"]}
                        </div>
                        <div className="text-left m-2">
                          {fitting.Description}
                        </div>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))
              : // Handle Flat Arrays for Other Categories
                fittings[activeGrid]?.map((fitting) => (
                  <React.Fragment key={fitting["ItemNumber"]}>
                    <div className="text-left m-2">{fitting["ItemNumber"]}</div>
                    <div className="text-left m-2">{fitting.Description}</div>
                  </React.Fragment>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

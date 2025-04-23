import React, { useState, useRef, useEffect } from "react";
import fittings from "../JSON/fittings.json";

const Sidebar = ({ isVisible, onFittingSelect, onClose }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeGrid, setActiveGrid] = useState(null);
  const submenuRef = useRef(null);
  const sidebarRef = useRef(null);


  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
    setActiveGrid(null);
  }


  const toggleGrid = (grid) => {
    setActiveGrid(activeGrid === grid ? null : grid);
  };

  const fittingKeys = Object.keys(fittings).map((key) => {
    return key; // Returns each key
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      const overflowDiv = document.getElementById("overflowDiv");
      
      // Close everything if clicking outside both sidebar and active grid
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !overflowDiv?.contains(event.target)
      ) {
        onClose();
        setActiveGrid(null);
        setActiveSubmenu(null);
      }
      // Close only grid if clicking inside sidebar but outside both submenu and grid
      else if (
        activeGrid &&
        !submenuRef.current?.contains(event.target) &&
        !overflowDiv?.contains(event.target)
      ) {
        setActiveGrid(null);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeGrid, onClose]);

  return (
    <div 
      className={`${isVisible ? "relative" : "hidden"}`} 
      id="sb" 
      ref={sidebarRef} // This now wraps both the main sidebar and active grid
    >
      {/* Categories Menu */}
      <div className="w-64 h-full bg-gray-200 text-center">
        <div
          className="bg-zinc-400 cursor-pointer p-2 hover:bg-zinc-500 active:bg-gray-950 active:bg-opacity-70"
          onClick={() => toggleSubmenu("fittings")}
        >
          Fittings
        </div>

          {activeSubmenu === "fittings" && (
            <div
              className="h-lg:max-h-96 max-h-64 overflow-auto"
              ref={submenuRef}
            >
              {fittingKeys.map((key) => (
                <div
                  key={key}
                  className="bg-gray-200 cursor-pointer p-2 hover:bg-gray-300 active:bg-gray-950 active:bg-opacity-20"
                  onClick={() => toggleGrid(key)}
                  onBlur={""}
                >
                  {key.replace(/([A-Z]|\d\d[A-Z])/g, " $1")}{" "}
                </div>
              ))}
              {/* Add Item  Button*/}

              {/* Add Item Button */}
              <div
                className="bg-blue-400 cursor-pointer p-2 text-white font-bold hover:bg-blue-500 active:bg-blue-600"
                onClick={""} // Define this function to handle adding items to JSON
              >
                + Add Item
              </div>
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
          className="absolute top-0 left-64 w-64 h-80 border bg-white shadow-md overflow-auto rounded-md"
        >
    <div className="grid grid-cols-2 text-sm">
      <div className="font-bold text-left m-2">Item Number</div>
      <div className="font-bold text-left m-2">Description</div>

      {activeGrid === "ProClamps" || activeGrid === "PrivacySlats"
        ? Object.keys(fittings[activeGrid][0]).map((groupKey) => (
            <React.Fragment key={groupKey}>
              <div className="col-span-2 font-bold bg-gray-200 text-left m-2">
                {groupKey.replace(/([A-Z]|\d\d[A-Z])/g, " $1")}
              </div>
              {fittings[activeGrid][0][groupKey].map((fitting) => (
                <button
                  key={fitting["ItemNumber"]}
                  className="col-span-2 grid grid-cols-2 hover:bg-gray-100 focus:outline-none"
                  onClick={() => {onFittingSelect(fitting);}} // Add your click handler
                >
                  <div className="text-left m-2">{fitting["ItemNumber"]}</div>
                  <div className="text-left m-2">{fitting.Description}</div>
                </button>
              ))}
            </React.Fragment>
          ))
        : fittings[activeGrid]?.map((fitting) => (
            <button
              key={fitting["ItemNumber"]}
              className="col-span-2 grid grid-cols-2 hover:bg-gray-100 focus:outline-none"
              onClick={() => {onFittingSelect(fitting);}} // Add your click handler
            >
              <div className="text-left m-2">{fitting["ItemNumber"]}</div>
              <div className="text-left m-2">{fitting.Description}</div>
            </button>
          ))}
    </div>
  </div>
)}
      </div>
      );
      };
export default Sidebar;

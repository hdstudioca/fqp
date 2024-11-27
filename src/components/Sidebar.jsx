import React, { useState } from "react";

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

  return (
    <div className="relative w-64 h-full bg-gray-100 text-center">
      <div
        className="bg-zinc-400 cursor-pointer p-2"
        onClick={() => toggleSubmenu("fittings")}
      >
        Fittings
      </div>
      {activeSubmenu === "fittings" && (
        <div className="relative">
          <div
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("tensionBands")}
          >
            Tension Bands
          </div>
          {activeGrid === "tensionBands" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 04001-XX </div>
                <div className="text-left m-2"> 1 3/8" Tension Band </div>
              </div>
            </div>
          )}

          <div
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("braceBands")}
          >
            Brace Bands
          </div>
          {activeGrid === "braceBands" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 00000-XX </div>
                <div className="text-left m-2"> Brace Band </div>
              </div>
            </div>
          )}

          <div
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("domeCap")}
          >
            Dome Cap
          </div>
          {activeGrid === "domeCap" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 00000-XX </div>
                <div className="text-left m-2"> Dome Cap </div>
              </div>
            </div>
          )}

<div
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("squareTensionBand")}
          >
            Square Tension Bands
          </div>
          {activeGrid === "squareTensionBand" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 00000-XX </div>
                <div className="text-left m-2"> square Tension Band </div>
              </div>
            </div>
          )}
          <div
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("squareBraceBand")}
          >
            Square Brace Bands
          </div>
          {activeGrid === "squareBraceBand" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 00000-XX </div>
                <div className="text-left m-2"> Square Brace Band </div>
              </div>
            </div>
          )}
          <div
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("squareDomeCap")}
          >
            Square Dome Cap
          </div>
          {activeGrid === "squareDomeCap" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 00000-XX </div>
                <div className="text-left m-2"> Square Dome Cap </div>
              </div>
            </div>
          )}
        
          <div 
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("linePostTops")}
          >
            Line Post Tops
          </div>
          {activeGrid === "linePostTops" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 00000-XX </div>
                <div className="text-left m-2"> Line Post Tops </div>
              </div>
            </div>
          )}
          <div 
            className="bg-gray-200 cursor-pointer p-2"
            onClick={() => toggleGrid("railEnds")}
          >
            Rail Ends
          </div>
          {activeGrid === "railEnds" && (
            <div className="absolute top-0 left-full w-64 border bg-white shadow-md">
              <div className="grid grid-cols-2 text-sm">
                <div className="font-bold text-left m-2"> Item Number </div>
                <div className="font-bold text-left m-2"> Description </div>
                <div className="text-left m-2"> 00000-XX </div>
                <div className="text-left m-2"> Rail Ends </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-zinc-400 cursor-pointer p-2"> Pipe </div>
      <div className="bg-zinc-400 cursor-pointer p-2"> Mesh </div>
    </div>
  );
};

export default Sidebar;

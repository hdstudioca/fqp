import React, { useState } from "react";

import "../stylesheets/Table.module.css";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

// Default data for the table
const defaultData = [
  {
    "Hours": "+Hours Worked",
	"Rate": "-",
	"Total": "-",
  },
  
];

// Helper function for creating column definitions
const columnHelper = createColumnHelper();

// Define table columns
const columns = [
  // Column for "Labour"

  // add employee name 
  

  columnHelper.accessor("Hours", {
    cell: (info) => info.getValue(), // Display cell value
  }),
  // Column for "Rate"
  columnHelper.accessor("Rate", {
    cell: (info) => info.getValue(), // Display cell value
  }),
  // Column for "Total"
  columnHelper.accessor("Total", {
    cell: (info) => info.getValue(), // Display cell value
  }),
];

// Main application component
function LabourTable({initialTableName = "Table 1"}) {

  const [tableName, setTableName] = useState(initialTableName);
  // State to hold table data
  const [data, _setData] = useState(() => [...defaultData]);
  

  // Create the table instance with data and columns
  const table = useReactTable({
    columns,
    data,    
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 10, //custom default page size
      },
    },
  });

  return (
    <div className="p-2 bg-gray-100">
      {" "}
      {/* Wrapper div with padding */}
      {/* Table structure */}
      <table>
        {/* Table header */}
        <thead>
            <tr>
                <th className="rounded-t-md border-none">
                  {tableName}                  
                </th>
            </tr>
        </thead>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null // If it's a placeholder, render nothing
                    : flexRender(
                        header.column.columnDef.header, // Render header content
                        header.getContext() // Provide context
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Table body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} >
                  {flexRender(
                    cell.column.columnDef.cell, // Render cell content
                    cell.getContext() // Provide context
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* Table footer */}
      </table>
      <div className="h-4" /> {/* Spacer */}
      {/* Button to trigger re-render */}
      
    </div>
  );
}

export default LabourTable;

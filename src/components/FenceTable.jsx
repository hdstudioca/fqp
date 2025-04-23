import React, { useState, useMemo, useEffect } from "react";

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
    ItemNumber: "+Add Item", // Changed from "Item-Number" to match column accessor
    Description: "-",
    Unit: "-",
    Quantity: "-",
    Material: "-",
    Price: "-",
    Total: "-",
  },
];

// Helper function for creating column definitions
const columnHelper = createColumnHelper();

// Define table columns
const columns = [
  columnHelper.accessor("ItemNumber", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Description", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Unit", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Quantity", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Material", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Price", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("Total", {
    cell: (info) => {
      const value = info.getValue();
    return typeof value === "number" 
      ? `$${value.toFixed(2)}` 
      : value;
    },
  }),
];

// Main application component
function FenceTable({
  initialTableName = "Table 1",
  openSidebar,
  selectedFitting,
  onFittingAdded,
}) {
  const [items, setItems] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [tableName, _setTableName] = useState(initialTableName);

  // Modified updateItem function to handle material changes
  const updateItem = (rowIndex, columnId, value) => {
    setItems((prev) =>
      prev.map((row, index) => {
        if (index === rowIndex) {
          const updatedRow = { ...row, [columnId]: value };

          if (columnId === "Material" && row.fittingData) {
            // Update price and recalculate total
            const newPrice = row.fittingData[value] || 0;
            updatedRow.Price = newPrice;
            updatedRow.Total = newPrice * updatedRow.Quantity;
          } 
          else if (columnId === "Quantity") {
            // Convert quantity to number and recalculate total
            const quantity = parseFloat(value) || 0;
            updatedRow.Quantity = quantity;
            updatedRow.Total = quantity * updatedRow.Price;
          }

          return updatedRow;
        }
        return row;
      })
    );
  };

  // Combine items with default row
  const data = useMemo(() => [...items, defaultData[0]], [items]);

  useEffect(() => {
    if (selectedFitting) {
      const supportedMaterials = ["PS", "AL", "BL", "MA"].filter(
        (mat) => selectedFitting[mat] > 0
      );

      const initialPrice = supportedMaterials.length > 0 
        ? selectedFitting[supportedMaterials[0]]
        : 0;

      const newItem = {
        ItemNumber: selectedFitting.ItemNumber,
        Description: selectedFitting.Description,
        Unit: "EA",
        Quantity: 1,
        Material: supportedMaterials[0] || "-",
        Price: initialPrice,
        Total: initialPrice * 1, // Calculate initial total
        fittingData: selectedFitting,
      };

      setItems((prev) => [...prev, newItem]);
      onFittingAdded();
    }
  }, [selectedFitting, onFittingAdded]);

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

  const totalPages = useMemo(() => table.getPageCount(), [table]);

  return (
    <div className="p-2 bg-gray-100">
      {" "}
      {/* Wrapper div with padding */}
      {/* Table structure */}
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th className="rounded-t-md border-none">{tableName}</th>
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
  {table.getRowModel().rows.map((row) => {
    const isDefaultRow = row.index === data.length - 1;

    return (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell, index) => {
          const isEditable = !isDefaultRow && 
            (cell.column.id === 'Quantity' || cell.column.id === 'Material');
          const isEditing = editingCell?.rowId === row.id && 
            editingCell?.columnId === cell.column.id;

          return (
            <td
              key={cell.id}
              onClick={() => {
                if (index === 0) openSidebar();
                if (isEditable) setEditingCell({ 
                  rowId: row.id, 
                  columnId: cell.column.id 
                });
              }}
              className={index === 0 
                ? "hover:bg-sky-700 cursor-pointer" 
                : (isEditable ? "hover:bg-gray-100 cursor-pointer" : "")}
            >
              {index === 0 ? (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              ) : isEditable && isEditing ? (
                cell.column.id === 'Material' ? (
                  // Material dropdown
                  <select
                    value={cell.getValue()}
                    onChange={(e) => {
                      updateItem(row.index, cell.column.id, e.target.value);
                      setEditingCell(null);
                    }}
                    autoFocus
                    className="w-full px-2"
                  >
                    {row.original.fittingData && 
                      ['PS', 'AL', 'BL', 'MA'].map(mat => (
                        row.original.fittingData[mat] > 0 && (
                          <option key={mat} value={mat}>
                            {mat} (${row.original.fittingData[mat]})
                          </option>
                        )
                      ))}
                  </select>
                ) : (
                  // Quantity input
                  <input
                    type="number"
                    value={cell.getValue()}
                    onChange={(e) => updateItem(row.index, cell.column.id, e.target.value)}
                    onBlur={() => setEditingCell(null)}
                    onKeyDown={(e) => e.key === 'Enter' && setEditingCell(null)}
                    autoFocus
                    className="w-full px-2"
                  />
                )
              ) : (
                <div>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              )}
            </td>
          );
        })}
      </tr>
    );
  })}
</tbody>

        {/* Table footer */}
      </table>
      {/* Button to trigger re-render */}
      <div className="flex justify-center">
        <button
          className="px-2 border-solid border rounded-lg text-md border-gray-200 hover:text-white"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"< Prev"}
        </button>
        <div className="flex">
          {" "}
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={`border rounded-lg select-none text-center text-base text-lg px-2 ml-2 ${
                table.getState().pagination.pageIndex === index
                  ? "bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <button
          className="px-2 ml-2 border-solid border rounded-lg text-md border-gray-200 hover:text-white"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}

export default FenceTable;

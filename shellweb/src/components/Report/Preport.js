
import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Preport = () => {
  const rawData = [
    { category: "Fruit", item: "Apple", quantity: 10 },
    { category: "Fruit", item: "Banana", quantity: 5 },
    { category: "Vegetable", item: "Carrot", quantity: 8 },
    { category: "Vegetable", item: "Tomato", quantity: 6 },
  ];

  // Transform data into pivot format
  const createPivotTable = (data) => {
    const pivot = {};
    data.forEach(({ category, item, quantity }) => {
      if (!pivot[category]) pivot[category] = {};
      pivot[category][item] = quantity;
    });

    // Convert pivot object to array format for Excel export
    const rows = [];
    const itemsSet = new Set();

    Object.values(pivot).forEach((row) =>
      Object.keys(row).forEach((key) => itemsSet.add(key))
    );

    const items = Array.from(itemsSet);
    rows.push(["Category", ...items]);

    Object.entries(pivot).forEach(([category, row]) => {
      const rowData = [category];
      items.forEach((item) => rowData.push(row[item] || 0));
      rows.push(rowData);
    });

    return rows;
  };

  const exportToExcel = () => {
    const pivotData = createPivotTable(rawData);
    const worksheet = XLSX.utils.aoa_to_sheet(pivotData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Pivot");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Save the file
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "pivot_table.xlsx");
  };

  return <button onClick={exportToExcel}>Export Pivot Table</button>;
};

export default Preport;

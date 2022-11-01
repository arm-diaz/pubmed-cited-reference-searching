import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

type exportTypes = {
  apiData: any[]
  fileName: string
}

export const ExportToExcel = ({apiData, fileName} : exportTypes) => {

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className="download__wrapper"> 
      <button id="download-button" onClick={(e) => exportToCSV(apiData, fileName)}> Export</button>
    </div> 
  );
  
};
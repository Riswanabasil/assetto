
import * as XLSX from "xlsx";
import type { GRNResponse } from "../types/grn";

export function exportGRNsToExcel(grns: GRNResponse[]) {
  const worksheetData = grns.map(grn => ({
    "GRN Number": grn.grnNumber,
    "Invoice Number": grn.invoiceNumber,
    "GRN Date": new Date(grn.grnDate).toLocaleDateString(),
    Vendor: grn.vendor,
    Branch: grn.branch,
    "Total Amount": grn.totalAmount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "GRNs");
  XLSX.writeFile(workbook, "GRN_Report.xlsx");
}

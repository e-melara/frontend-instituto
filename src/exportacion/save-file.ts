import { saveAs } from "file-saver";
import type { Workbook } from "exceljs";

export function saveFile(
  workbook: Workbook,
  nameFile: string = new Date().getTime().toString()
) {
  return workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.ms-excel",
    });
    saveAs(blob, `${nameFile}.xlsx`);
  });
}

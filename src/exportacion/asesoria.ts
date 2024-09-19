import Excel from "exceljs";

import { saveAs } from "file-saver";
import type { Academic } from "@/pensum/interfaces";

export const excelExportFile = async (academic: Academic[]) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Horario");

  const columns = [
    { key: "codmate", header: "Codigo" },
    { key: "nommate", header: "Materia" },
    { key: "docente", header: "Docente" },
  ];

  worksheet.columns = columns;
  academic.forEach((item) => {
    worksheet.addRow({
      codmate: item.subject_code,
      nommate: item.subject_name,
      horario: 'A',
      docente: `${item.teacher_names} ${item.teacher_lasts}`,
    });
  });

  worksheet.getRow(1).font = {
    name: "Arial",
    family: 2,
    size: 14,
  };

  const time = new Date().getTime();
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.ms-excel",
    });
    saveAs(blob, `horario-${time}.xlsx`);
  });
};

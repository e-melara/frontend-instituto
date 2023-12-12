import type { CargasAcademica } from "@/pensum/interfaces";
import Excel from "exceljs";
import { saveAs } from "file-saver";

export const excelExportFile = async (materias: CargasAcademica[]) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Horario");

  const columns = [
    { key: "codmate", header: "Codigo" },
    { key: "nommate", header: "Materia" },
    { key: "horario", header: "Horario" },
    { key: "docente", header: "Docente" },
  ];

  worksheet.columns = columns;

  materias.forEach((item) => {
    worksheet.addRow({
      codmate: item.materia.codigo,
      nommate: item.materia.nombre,
      horario: `${item.horario.codigo} - ${item.horario.nombre}`,
      docente: `${item.docente.nombre} ${item.docente.apellido}`,
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

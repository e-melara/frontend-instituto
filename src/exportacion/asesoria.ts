import type { Inscribir } from "@/pensum/interfaces";
import Excel from "exceljs";
import { saveAs } from "file-saver";

export const excelExportFile = async (materias: Inscribir[]) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Horario");

  const columns = [
    { key: "codmate", header: "Codigo" },
    { key: "nommate", header: "Materia" },
    { key: "dias", header: "Dia" },
    { key: "horario", header: "Horario" },
    { key: "aula", header: "Aula" },
  ];

  worksheet.columns = columns;

  materias.forEach((materia) => {
    worksheet.addRow({
      codmate: materia.codmate,
      nommate: materia.materia.nommate,
      dias: materia.dias,
      horario: materia.hora,
      aula: materia.aula,
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

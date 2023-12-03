import Excel from "exceljs";

import { saveFile } from "./save-file";
import { createOuterBorder } from "./utils";
import { TypeOrden } from "@/notes/interfaces";
import type { ICarga } from "@/notes/interfaces";

const header = (worksheet: Excel.Worksheet, carga: ICarga) => {
  const { docente, materia, codcarga, dias, hora } = carga;
  worksheet.mergeCells("B2:J2");
  worksheet.mergeCells("B4:E4");
  worksheet.mergeCells("B5:E5");

  worksheet.mergeCells("F4:J4");
  worksheet.mergeCells("F5:J5");

  worksheet.getCell("A1").value = codcarga;
  worksheet.getCell("J2").value = materia.toString();
  worksheet.getCell("E4").value = `Codigo: ${codcarga}`;
  worksheet.getCell(
    "E5"
  ).value = `Docente: ${docente?.nombres} ${docente?.apellidos}`;
  worksheet.getCell("J4").value = `Dias: ${dias}`;
  worksheet.getCell("J5").value = `Horario: ${hora}`;

  // anchos de las columnas
  const items = [
    { column: 0, width: 1 },
    { column: 1, width: 5.5 },
    { column: 2, width: 12.1 },
    { column: 3, width: 48.4 },
    { column: 4, width: 28.25 },
  ];

  items.forEach(({ column, width }) => {
    worksheet.columns[column].width = width;
  });
};

const styles = (worksheet: Excel.Worksheet) => {
  ["J2", "E4", "E5", "J4", "J5"].map((cell) => {
    const primary = cell === "J2";
    worksheet.getCell(cell).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell(cell).font = {
      name: "Arial",
      size: primary ? 14 : 12,
      bold: primary ? true : false,
    };
  });

  worksheet.getCell("A1").font = {
    color: {
      argb: "FFFFFFFF",
      theme: 1,
    },
  };
};

export const excelExportFileCuadro = async (carga: ICarga) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Cuadro de notas");

  // protecion de hoja
  const password = new Date().getTime() + "--pass--word--secret";
  await worksheet.protect(password, {});

  // header
  header(worksheet, carga);

  let array = new Array<any>();
  if (carga.alumnos) {
    array = carga.alumnos?.map((alumno, index) => {
      return [
        index + 1,
        alumno.carnet,
        `${alumno.apellidos} ${alumno.nombres }`,
        `${alumno.carnet}@utla.edu.sv`,
        alumno.nota1 || null,
        alumno.nota2 || null,
        alumno.nota3 || null,
        alumno.nota4 || null,
        alumno.nota5 || null,
        alumno.promedio || null,
      ];
    });
  }

  worksheet.addTable({
    ref: "B7",
    name: "notas",
    headerRow: true,
    totalsRow: false,
    style: {
      theme: "TableStyleLight1",
      showRowStripes: true,
    },
    columns: [
      { name: "#", filterButton: false },
      { name: "Carnet", filterButton: false },
      { name: "Alumno", filterButton: false },
      { name: "Correo", filterButton: false },
      { name: "Nota 1", filterButton: false },
      { name: "Nota 2", filterButton: false },
      { name: "Nota 3", filterButton: false },
      { name: "Nota 4", filterButton: false },
      { name: "Nota 5", filterButton: false },
      { name: "Promedio", filterButton: false },
    ],
    rows: [...array],
  });

  styles(worksheet);
  createOuterBorder(
    worksheet,
    { row: 7, column: 2 },
    { column: 12, row: 8 + array.length }
  );

  createOuterBorder(
    worksheet,
    { row: 8, column: 6 },
    { column: 11, row: 8 + array.length },
    TypeOrden.Protection
  );

  createOuterBorder(
    worksheet,
    { row: 8, column: 6 },
    { column: 11, row: 8 + array.length },
    TypeOrden.Validation
  );

  const nameFile = `${carga.codmate}-${carga.materia}-${new Date().getTime()}`;
  return saveFile(workbook, nameFile);
};

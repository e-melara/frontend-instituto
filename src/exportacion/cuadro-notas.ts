import Excel from "exceljs";

import { saveFile } from "./save-file";
import { createOuterBorder } from "./utils";
import { TypeOrden } from "@/notes/interfaces";

const header = (worksheet: Excel.Worksheet, carga: any) => {
  worksheet.mergeCells("B2:J2");
  worksheet.mergeCells("B4:E4");
  worksheet.mergeCells("B5:E5");

  worksheet.mergeCells("F4:J4");
  worksheet.mergeCells("F5:J5");

  const [item] = carga
  worksheet.getCell("A1").value = item.carga_academica_id;
  worksheet.getCell("J2").value = 'NOMBRE MATERIA';
  worksheet.getCell("E4").value = `Codigo: CODIGO DE CARGA ACADEMICA`;
  worksheet.getCell(
    "E5"
  ).value = `Docente: NOMBRE DEL DOCENTE`;
  worksheet.getCell("J5").value = `Horario`;

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

export const excelExportFileCuadro = async (carga: any) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Cuadro de notas");

  // protecion de hoja
  const password = new Date().getTime() + "--pass--word--secret";
  await worksheet.protect(password, {});

  // header
  let array = new Array<any>();
  if (carga) {
    header(worksheet, carga);
    array = carga.map((item: any, index: number) => {
      return [
        index + 1,
        item.alumno.carnet,
        `${item.alumno.apellidos} ${item.alumno.nombres }`,
        `${item.alumno.carnet}@correo.edu.sv`,      
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

  const nameFile = `${new Date().getTime()}`;
  return saveFile(workbook, nameFile);
};

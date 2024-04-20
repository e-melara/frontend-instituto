import Excel from "exceljs";

import { saveFile } from "./save-file";
import { createOuterBorder } from "./utils";
import { TypeOrden } from "@/notes/interfaces";

const header = (worksheet: Excel.Worksheet, carga: any, docente: any, materia: any) => {
  worksheet.mergeCells("B2:E2");
  worksheet.mergeCells("B4:E4");
  worksheet.mergeCells("B5:E5");

  worksheet.mergeCells("F4:J4");
  worksheet.mergeCells("F5:J5");

  const [item] = carga
  worksheet.getCell("A1").value = item.carga_academica_id;
  worksheet.getCell("E2").value = `NOMBRE MATERIA: ${materia.nombre}`;
  worksheet.getCell("E4").value = `Codigo: ${materia.codigo}`;
  worksheet.getCell("E5").value = `Docente: ${docente.nombres} ${docente.apellidos}`;

  // anchos de las columnas
  const items = [
    { column: 0, width: 1 },
    { column: 1, width: 5.5 },
    { column: 2, width: 12.1 },
    { column: 3, width: 48.4 },
    { column: 4, width: 6.0 },
  ];

  items.forEach(({ column, width }) => {
    worksheet.columns[column].width = width;
  });
};

const styles = (worksheet: Excel.Worksheet) => {
  ["E2", "E4", "E5", "J4", "J5"].map((cell) => {
    const primary = cell === "E2";
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

export const excelExportFileCuadro = async (carga: any, data: any) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Cuadro de notas");

  const { materia, docente } = data.value;

  // protecion de hoja
  const password = new Date().getTime() + "--pass--word--secret";
  await worksheet.protect(password, {});

  // header
  let array = new Array<any>();
  if (carga) {
    header(worksheet, carga, docente, materia);
    array = carga.map((item: any, index: number) => {
      return [
        index + 1,
        item.alumno.carnet,
        `${item.alumno.apellidos} ${item.alumno.nombres }`
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
      { name: "Nota", filterButton: false },
    ],
    rows: [...array],
  });

  styles(worksheet);
  createOuterBorder(
    worksheet,
    { row: 7, column: 12 },
    { column: 5, row: 8 + array.length }
  );

  createOuterBorder(
    worksheet,
    { row: 8, column: 5 },
    { row: 8 + array.length, column: 5  },
    TypeOrden.Protection
  );

  createOuterBorder(
    worksheet,
    { row: 8, column: 5 },
    { column: 5, row: 8 + array.length },
    TypeOrden.Validation
  );

  const nameFile = `${materia.nombre}-${docente.nombres}-${new Date().getTime()}`;
  return saveFile(workbook, nameFile);
};

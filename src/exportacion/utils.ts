import { Workbook } from "exceljs";
import type { Worksheet } from "exceljs";

import { TypeOrden } from "@/notes/interfaces";
import type { IExcelFile } from "@/notes/interfaces";

interface Props {
  row: number;
  column: number;
}

export const createOuterBorder = (
  worksheet: Worksheet,
  start: Props,
  end: Props,
  opts: TypeOrden = TypeOrden.Border,
  borderStyle: any = "thin",
  color: string = "F08080"
) => {
  const border = {
    top: { style: borderStyle },
    left: { style: borderStyle },
    bottom: { style: borderStyle },
    right: { style: borderStyle },
  };

  if (opts === TypeOrden.Fill) {
    for (let column = start.column; column < end.column; column++) {
      worksheet.getCell(start.row, column).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color },
      };
    }
  } else {
    for (let row = start.row; row < end.row; row++) {
      for (let column = start.column; column < end.column; column++) {
        if (opts === TypeOrden.Border) {
          worksheet.getCell(row, column).border = border;
        }

        if (opts === TypeOrden.Protection) {
          worksheet.getCell(row, column).protection = {
            locked: false,
          };
        }

        if (opts === TypeOrden.Validation) {
          worksheet.getCell(row, column).dataValidation = {
            type: "decimal",
            operator: "between",
            allowBlank: true,
            showErrorMessage: true,
            formulae: [0.0, 10.0],
            promptTitle: "Decimal",
            errorStyle: "error",
            errorTitle: "Valor no valido",
            error:
              "El valor debe ser un numero, Debe ser mayor que cero y menor o igual a 10",
          };
        }
      }
    }
  }
};

export const readFile = (files: any[], noteKey: string, codCarga: number) => {
  const [file] = files;
  const wb = new Workbook();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.readAsArrayBuffer(file);
    reader.onerror = () => {
      reject("Tenemos un problema para poder leer el documento");
    };
    reader.onload = () => {
      const buffer = reader.result as Buffer;
      wb.xlsx.load(buffer).then((workbook) => {
        const array: IExcelFile[] = [];
        const worksheet = workbook.worksheets[0];

        const codCargaExcel = worksheet.getCell("A1").value?.toString();
        console.log(codCarga, codCargaExcel)
        if (codCarga.toString() !== codCargaExcel) {
          reject("El Documento no es valido para esta asignatura");
        }

        worksheet.eachRow({ includeEmpty: true }, function (_, rowNumber) {
          if (rowNumber > 7) {
            const row = worksheet.getRow(rowNumber);
            const valorNoteKey =
              parseFloat(row.getCell(noteKey).value?.toString()!) || 0;
            array.push({
              carnet: row.getCell(3).value?.toString() || "",
              nombre: row.getCell(4).value?.toString() || "",
              color:
                valorNoteKey < 5
                  ? "bg-danger"
                  : valorNoteKey >= 5 && valorNoteKey <= 8
                  ? "bg-warning"
                  : "bg-primary",
              valor: valorNoteKey,
            });
          }
        });
        resolve(array);
      });
    };
  });
};

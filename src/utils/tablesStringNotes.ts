const stringOneNote = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="12">TEORIA</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">EXAMENES CORTOS</td>
  <td rowspan="2">EXAMEN FINAL</td>
  <td rowspan="2">EXAMEN FINAL 20%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>54%</td>
  <td>1</td>
  <td>14%</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>12%</td>
</tr>
`;

const stringEightNote = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="12">TEORIA</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">EXAMENES CORTOS</td>
  <td rowspan="2">EXAMEN FINAL</td>
  <td rowspan="2">EXAMEN FINAL 20%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>45%</td>
  <td>1</td>
  <td>20%</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
</tr>
`;

const stringCuatroNote = (showTitle: boolean = true) => `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="17">TEORIA</td>
  <td colspan="8">PRACTICA ${!showTitle ? "PEDIATRIA" : ""} </td>
  <td rowspan="3">NOTA FINAL CICLO (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="5">LABORATORIOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">Examen Repo</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA FINAL TEORIA 40%</td>
  <td rowspan="2">P</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">CV</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">PT</td>
  <td rowspan="2">30%</td>
  <td rowspan="2">NOTA FINAL DE PRACTICA</td>
  <td rowspan="2">NOTA FINAL PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>5%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>LAB. 4</td>
  <td>TOTAL 10%</td>
  <td>1</td>
  <td>10%</td>
</tr>
`;

const stringOnce = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="12">TEORIA</td>
  <td rowspan="3">NOTA FINAL TEORIA</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA FINAL TEORIA</td>
  <td rowspan="3">NOTA FINAL TEORIA 40%</td>
  <td colspan="8">PRACTICA</td>
  <td rowspan="3">NOTA FINAL CICLO (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">LABORATORIOS PRACTICOS</td>
  <td rowspan="2">EXAMEN FINAL</td>
  <td rowspan="2">EXAMEN FINAL 10%</td>
  <td rowspan="2">P</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">CV</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">PT</td>
  <td rowspan="2">30%</td>
  <td rowspan="2">NOTA FINAL PRACTICA</td>
  <td rowspan="2">PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>10%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>TOTAL 5%</td>
</tr>
`;

const stringDeizSeis = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="16">TEORIA</td>
  <td colspan="26">PRACTICAS</td>
  <td rowspan="3">N.F (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">N. DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">LABORATORIOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">N.F TEORIA</td>
  <td rowspan="2">EXAMEN DE REPO</td>
  <td rowspan="2">N.F TEORIA</td>
  <td rowspan="2">N.F TEORIA 40%</td>
  <td colspan="8">PARTO  20%</td>
  <td colspan="8">PUERPERIO 20%</td>
  <td colspan="8">PEDIATRIA 20%</td>
  <td rowspan="2">N.F PRACTICA</td>
  <td rowspan="2">60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>10%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>TOTAL 5%</td>
  <td>1</td>
  <td>10%</td>
  <td>P</td>
  <td>5%</td>
  <td>CV</td>
  <td>5%</td>
  <td>PT</td>
  <td>10%</td>
  <td>NOTA</td>
  <td>Total 20%</td>
  <td>P</td>
  <td>5%</td>
  <td>CV</td>
  <td>5%</td>
  <td>PT</td>
  <td>10%</td>
  <td>NOTA</td>
  <td>Total 20%</td>
  <td>P</td>
  <td>5%</td>
  <td>CV</td>
  <td>5%</td>
  <td>PT</td>
  <td>10%</td>
  <td>NOTA</td>
  <td>Total 20%</td>
</tr>
`;

const stringDos = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="11">TEORIA</td>
  <td rowspan="2" colspan="2">EXAMEN FINAL 20%</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="5">LABORATORIOS PRACTICOS</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>51%</td>
  <td>1</td>
  <td>14%</td>
  <td>LAB.1</td>
  <td>LAB.2</td>
  <td>LAB.3</td>
  <td>LAB.4</td>
  <td>TOTAL 20%</td>
  <td>1</td>
  <td>15%</td>
</tr>
`;

const stringNueve = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="11">TEORIA</td>
  <td rowspan="2" colspan="2">EXAMEN FINAL</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="5">LABORATORIOS PRACTICOS</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>45%</td>
  <td>1</td>
  <td>15%</td>
  <td>LAB.1</td>
  <td>LAB.2</td>
  <td>LAB.3</td>
  <td>LAB.4</td>
  <td>TOTAL 20%</td>
  <td>1</td>
  <td>20%</td>
</tr>
`;

const stringSiete = (showTitle: boolean = true) => `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="16">TEORIA</td>
  <td colspan="8">PRACTICAS</td>
  <td rowspan="3">NOTA FINAL (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">EXAMENES CORTOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">EXAMEN DE REPO</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA FINAL TEORIA 40%</td>
  <td colspan="6">${showTitle ? "UNIDAD DE SALUD" : ""}</td>
  <td rowspan="2">NOTA FINAL PRACTICA</td>
  <td rowspan="2">PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>5%</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>10%</td>
  <td>1</td>
  <td>10%</td>
  <td>P</td>
  <td>15%</td>
  <td>CV</td>
  <td>15%</td>
  <td>PT</td>
  <td>30%</td>
</tr>
`;

const stringQuince = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="16">TEORIA</td>
  <td colspan="12">PRACTICAS</td>
  <td rowspan="3">NOTA FINAL (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO </td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">PRUEBAS CORTAS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">EXAMEN DE REPO</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA FINAL TEORIA 40%</td>
  <td rowspan="2">P</td>
  <td rowspan="2">5%</td>
  <td rowspan="2">MR</td>
  <td rowspan="2">10%</td>
  <td rowspan="2">PAE</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">DS</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">PC</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">NOTA FINAL PRACTICA</td>
  <td rowspan="2">PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>5%</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>TOTAL 10%</td>
  <td>1</td>
  <td>10%</td>
</tr>
`;

const stringCatorce = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="16">TEORIA (T)</td>
  <td colspan="18">PRACTICA (P)</td>
  <td rowspan="3">NFC (T + P)</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">LABORATORIOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">EXAMEN DE REPO</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA FINAL TEORIA 40%</td>
  <td colspan="8">AREA DE MEDICINA</td>
  <td colspan="8">AREA DE CIRUGIA</td>
  <td rowspan="2">NOTA FINAL PRACTICA</td>
  <td rowspan="2">PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>10%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>TOTAL 5%</td>
  <td>1</td>
  <td>10%</td>
  <td>P</td>
  <td>7.50%</td>
  <td>CV</td>
  <td>7.50%</td>
  <td>PT</td>
  <td>15%</td>
  <td>NOTA</td>
  <td>TOTAL 30%</td>
  <td>P</td>
  <td>7.50%</td>
  <td>CV</td>
  <td>7.50%</td>
  <td>PT</td>
  <td>15%</td>
  <td>NOTA</td>
  <td>TOTAL 30%</td>
</tr>
`;

const stringDiezSiete = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="16">TEORIA</td>
  <td colspan="8">PRACTICAS</td>
  <td rowspan="3">NOTA FINAL (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">LABORATORIOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">EXAMEN DE REPO</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA FINAL TEORIA 40%</td>
  <td colspan="6">SALA DE OPERACIONES</td>
  <td rowspan="2">NOTA FINAL PRACTICA</td>
  <td rowspan="2">60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>10%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>TOTAL 5%</td>
  <td>1</td>
  <td>10%</td>
  <td>P</td>
  <td>15%</td>
  <td>CV</td>
  <td>15%</td>
  <td>PT</td>
  <td>30%</td>
</tr>
`;

const stringSeis = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="17">TEORIA</td>
  <td colspan="26">PRACTICAS</td>
  <td rowspan="3">NOTA FINAL (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="5">LABORATORIOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">EXAMEN DE REPO</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA FINAL TEORIA 40%</td>
  <td colspan="8">PARTO</td>
  <td colspan="8">PUERPERIO</td>
  <td colspan="8">UNIDAD DE SALUD</td>
  <td rowspan="2">NOTA FINAL DE PRACTICA</td>
  <td rowspan="2">NOTA FINAL PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>5%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>LAB. 4</td>
  <td>TOTAL 10%</td>
  <td>1</td>
  <td>10%</td>
  <td>P</td>
  <td>5%</td>
  <td>CV</td>
  <td>5%</td>
  <td>PT</td>
  <td>10%</td>
  <td>NOTA</td>
  <td>TOTAL 20%</td>
  <td>P</td>
  <td>5%</td>
  <td>CV</td>
  <td>5%</td>
  <td>PT</td>
  <td>10%</td>
  <td>NOTA</td>
  <td>TOTAL 20%</td>
  <td>P</td>
  <td>5%</td>
  <td>CV</td>
  <td>5%</td>
  <td>PT</td>
  <td>10%</td>
  <td>NOTA</td>
  <td>TOTAL 20%</td>
</tr>
`;

const stringDiez = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="8">TEORIA</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td rowspan="2">EXAMEN FINAL</td>
  <td rowspan="2">EXAMEN FINAL 25%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>45%</td>
  <td>1</td>
  <td>30%</td>
</tr>
`;

const stringTres = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="14">TEORIA</td>
  <td colspan="8">PRACTICAS DE BASES FUNDAMENTALES </td>
  <td rowspan="3">NOTA FINAL (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">EXAMENES CORTOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA TEORIA 40%</td>
  <td rowspan="2">P</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">CV</td>
  <td rowspan="2">15%</td>
  <td rowspan="2">PT</td>
  <td rowspan="2">30%</td>
  <td rowspan="2">NOTA FINAL PRACTICA</td>
  <td rowspan="2">NOTA FINAL PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>18%</td>
  <td>1</td>
  <td>6%</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>6%</td>
  <td>1</td>
  <td>10%</td>
</tr>
`;
const stringCinco = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="16">TEORIA (T)</td>
  <td colspan="18">PRACTICA (P)</td>
  <td rowspan="3">NFC (T + P)</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">LABORATORIOS</td>
  <td colspan="2">EXAMEN FINAL</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">EXAMEN DE REPO</td>
  <td rowspan="2">NOTA FINAL TEORIA</td>
  <td rowspan="2">NOTA FINAL TEORIA 40%</td>
  <td colspan="8">AREA DE MEDICINA</td>
  <td colspan="8">AREA DE CIRUGIA</td>
  <td rowspan="2">NOTA FINAL PRACTICA</td>
  <td rowspan="2">PRACTICA 60%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>15%</td>
  <td>1</td>
  <td>5%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>TOTAL 10%</td>
  <td>1</td>
  <td>10%</td>
  <td>P</td>
  <td>7.50%</td>
  <td>CV</td>
  <td>7.50%</td>
  <td>PT</td>
  <td>15%</td>
  <td>NOTA</td>
  <td>TOTAL 30%</td>
  <td>P</td>
  <td>7.50%</td>
  <td>CV</td>
  <td>7.50%</td>
  <td>PT</td>
  <td>15%</td>
  <td>NOTA</td>
  <td>TOTAL 30%</td>
</tr>
`;
const stringDoce = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="10">TEORIA</td>
  <td colspan="2" rowspan="2">EXAMEN FINAL</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">LABORATORIOS PRACTICOS</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>45%</td>
  <td>1</td>
  <td>15%</td>
  <td>LAB. 1</td>
  <td>LAB. 2</td>
  <td>LAB. 3</td>
  <td>TOTAL 20%</td>
  <td>1</td>
  <td>20%</td>
</tr>
`;
const stringTrece = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="13">TEORIA</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="5">LABORATORIOS PRACTICOS</td>
  <td colspan="2">EXAMEN FINAL</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>45%</td>
  <td>1</td>
  <td>15%</td>
  <td>LAB. 1</td>
  <td>10%</td>
  <td>LAB. 2</td>
  <td>10%</td>
  <td>TOTAL 20%</td>
  <td>1</td>
  <td>20%</td>
</tr>
`;

const stringDieciocho = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
	<td colspan="12">TEORIA</td>
  <td rowspan="3">NOTA FINAL</td>
  <td rowspan="3">EXAMEN DE REPOSICION</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
<tr>
  <td colspan="4">EXAMENES PARCIALES</td>
  <td colspan="2">TRABAJO DE CAMPO</td>
  <td colspan="4">EXAMENES CORTOS</td>
  <td rowspan="2">EXAMEN FINAL</td>
  <td rowspan="2">EXAMEN FINAL 20%</td>
</tr>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>54%</td>
  <td>1</td>
  <td>14%</td>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>TOTAL 12%</td>
</tr>
`;

const stringDieciNueve = `
<tr>
  <td rowspan="3">No</td>
  <td rowspan="3">CARNET</td>
  <td rowspan="3">NOMBRE DEL ESTUDIANTE</td>
  <td colspan="16">TEORIA</td>
  <td colspan="10">PRACTICAS</td>
  <td rowspan="3">NOTA FINAL (TEORIA + PRACTICA)</td>
  <td rowspan="3">EXAMEN DE REPO</td>
  <td rowspan="3">NOTA DEL CICLO</td>
</tr>
  <tr>
    <td colspan="4">EXAMANES PARCIALES</td>
    <td colspan="2">TRABAJO DE CAMPO</td>
    <td colspan="4">EXAMANES CORTOS</td>
    <td colspan="2">EXAMEN FINAL</td>
    <td rowspan="2">NOTA FINAL TEORIA</td>
    <td rowspan="2">EXAMEN DE REPO</td>
    <td rowspan="2">NOTA FINAL TEORIA</td>
    <td rowspan="2">NOTA FINAL TEORIA 40%</td>
    <td colspan="6">AREA DE PSIQUIATRIA</td>
    <td rowspan="2">PROYECTO SALUD MENTAL</td>
    <td rowspan="2">15%</td>
    <td rowspan="2">NOTA FINAL PRACTICA</td>
    <td rowspan="2">PRACTICA 60%</td>
  </tr>
		<tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>15%</td>
			<td>1</td>
			<td>5%</td>
			<td>1</td>
			<td>2</td>
			<td>3</td>
			<td>10%</td>
			<td>1</td>
			<td>10%</td>
			<td>P</td>
			<td>5%</td>
			<td>CV</td>
			<td>10%</td>
			<td>PT</td>
			<td>30%</td>
		</tr>
`;

const mapStringNotes = new Map<number, any>([
  [1, { template: stringOneNote, number_of_columns: 15 }],
  [2, { template: stringDos, number_of_columns: 16 }],
  [3, { template: stringTres, number_of_columns: 25 }],
  [4, { template: stringCuatroNote, number_of_columns: 28 }],
  [5, { template: stringCinco, number_of_columns: 37 }],
  [6, { template: stringSeis, number_of_columns: 46 }],
  [7, { template: stringSiete, number_of_columns: 27 }],
  [8, { template: stringEightNote, number_of_columns: 15 }],
  [9, { template: stringNueve, number_of_columns: 16 }],
  [10, { template: stringDiez, number_of_columns: 11 }],
  [11, { template: stringOnce, number_of_columns: 27 }],
  [12, { template: stringDoce, number_of_columns: 15 }],
  [13, { template: stringTrece, number_of_columns: 16 }],
  [14, { template: stringCatorce, number_of_columns: 37 }],
  [15, { template: stringQuince, number_of_columns: 31 }],
  [16, { template: stringDeizSeis, number_of_columns: 45 }],
  [17, { template: stringDiezSiete, number_of_columns: 27 }],
  [18, { template: stringDieciocho, number_of_columns: 15 }],
  [19, { template: stringDieciNueve, number_of_columns: 29 }],
]);

export const stringTableFn = (
  config_id: number,
  codigo: string
): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    console.log(config_id);
    if (mapStringNotes.has(config_id)) {
      if ([4, 7].includes(config_id)) {
        let showTitleTable = true;
        const mapItem = mapStringNotes.get(config_id);
        if (["ESCII23", "AGSE27", "AMNII14"].includes(codigo)) {
          showTitleTable = false;
        }
        resolve({
          template: mapItem?.template(showTitleTable),
          number_of_columns: mapItem?.number_of_columns,
        });
      }
      resolve(mapStringNotes.get(config_id) as any);
    } else {
      reject("No se encontro la configuracion");
    }
  });
};

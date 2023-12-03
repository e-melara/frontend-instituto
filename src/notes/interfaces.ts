export interface IDocenteNotes {
  coddoc: string;
  nombres: string;
  apellidos: string;
  cargas: ICarga[];
}

export interface ICarga {
  codcarga: number;
  ciclolectivo: string;
  codmate: string;
  turno: string;
  aula: string;
  hora: string;
  dias: string;
  tipoinscri: string;
  materia: Materia | string;
  docente?: IDocente;
  alumnos?: IAlumno[];

  e1?: string;
  e2?: string;
  e3?: string;
  e4?: string;
  e5?: string;
}

export interface IAlumno {
  estado: string;
  carnet: string;
  nombres: string;
  apellidos: string;
  nota1: number;
  nota2: number;
  nota3: number;
  nota4: number;
  nota5: number;
  promedio: number;
}

export interface Materia {
  codmate: string;
  nommate: string;
}

export interface IDocente {
  coddoc: string;
  nombres: string;
  apellidos: string;
}

export enum TypeOrden {
  Border,
  Protection,
  Validation,
  Fill,
}

export interface IExcelFile {
  carnet: string;
  nombre: string;
  color: string;
  valor: string | number | undefined;
}

export interface CargaAcademicaHistory {
  carnet:       string;
  codcarga:     string;
  coddoc:       string;
  codmate:      string;
  ciclolectivo: string;
  turno:        string;
  nota1:        number;
  nota2:        number;
  nota3:        number;
  nota4:        number;
  nota5:        number;
  promedio:     number;
  nommate:      string;
  apellidos:    string;
  nombres:      string;
  estado:       string;
  plan:         string;
  codcarre:     string;
}
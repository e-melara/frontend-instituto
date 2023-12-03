export interface Pensum {
  uv: number;
  show: boolean;
  carnet: string;
  pensum: PensumItem[];
  inscribir: Inscribir[];
  enrolled: SubjectEnrolled | null;
}

export interface Student {
  carnet: string;
  apellidos: string;
  nombres: string;
  plan: string;
  idcarrera: string;
}

export interface Cargas {
  id: string;
  codcarga: number;
  student_enrolled_id: string;
  estado: Status;
  codmate: string;
  turno: string;
  hora: string;
  dias: string;
  lab: string;
  nommate: string;
}

export interface SubjectEnrolled {
  id: string;
  ciclo: string;
  carnet: string;
  estado: string;
  observacion: string;
  created_at: string;
  updated_at: string;
  subjects: Subject[];
  cargas?: Cargas[];
}

export interface Subject {
  id: string;
  estado: string;
  codcarga: number;
  student_enrolled_id: string;
}

export interface Inscribir {
  codcarga: number;
  ciclolectivo: string;
  coddoc: string;
  codmate: string;
  turno: string;
  aula: string;
  hora: string;
  dias: string;
  tipoinscri: string;
  materia: IMateria;
}

export interface IHorarioAsesoria {
  id: number;
  coddoc: string;
  dias: string;
  horas: string;
  turno: string;
}

export interface IMateria {
  codmate: string;
  nommate: string;
  visible: boolean;
  horarios?: IHorarioAsesoria[];
}

export interface PensumItem {
  id: string;
  ciclopens: string;
  codcarre: string;
  nopensum: number;
  nommate: string;
  codmate: string;
  univalora: number;
  codprere: string;
  plan: string;
  status?: Status;
}

export interface Subjects {
  item: IHorarioAsesoria;
  codmate: string;
  nommate: string;
}

export enum Status {
  A = "A",
  I = "I",
  R = "R",
  C = "C",
}

export interface Enrolled {
  body: Body[];
  total_rows: number;
  paginate: string;
  per_page: string;
}

export interface Body {
  id: string;
  ciclo: string;
  carnet: string;
  observacion: string;
  estado: string;
  created_at: string;
  updated_at: string;
  apellidos: string;
  nombres: string;
  idcarrera: string;
  nomcarrera: string;
}

export interface PensumEnrolled {
  pensum: Pensum;
  enrolled: SubjectEnrolled;
  student: Student;
}

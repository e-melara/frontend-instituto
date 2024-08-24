export interface Pensum {
  id: number
  uv: number
  ciclo: string
  estado: string
  no_ciclo: number
  requisitos: string
  curso_id: number
  curso_nombre: string
  no_orden: number
  curso_codigo: string
  requisitos_array: number[]
}

export interface CargasAcademica {
  id:         number;
  docente_id: number;
  materia_id: number;
  horario_id: number;
  ciclo_id:   number;
  visible?:    boolean;
  horario: {
    id:     number;
    nombre: string;
    codigo: string;
  }
  materia: {
    nombre: string;
    codigo: string;
  }
  docente: {
    nombre:   string;
    apellido: string;
  };
}

export interface Docente {

}

export interface Horario {

}

export interface Materia {

}

export interface ICarrera {
  codigo: string;
  nombre: string;
  id: number;
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
  creditos: number;
  semestre: string;
  no_orden: number;
  pensum_materia_id: number;
  pensum_id: number;
  materia_id: number;
  nombre_materia: string;
  codigo_materia: string;
  requisitos: string;
  estado: string;
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

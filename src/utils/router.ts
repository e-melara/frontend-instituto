import type { IRuta } from "@/interfaces";

const arrayRutas: IRuta[] = [
  {
    name: "Inicio",
    icon: "home",
    nombre: "Inicio",
    url: "/",
    permissions: "public",
  },
  {
    name: "pensum-student",
    icon: "book",
    nombre: "Pensum",
    url: "/pensum/student",
    permissions: "student.pensum.view",
  },
  {
    name: "notes-docente",
    icon: "book",
    nombre: "Materias",
    url: "/notes/docente",
    permissions: "docente.notes.view",
  },
  {
    name: "notes-student",
    icon: "columns",
    nombre: "Notas",
    url: "/notes/student",
    permissions: "student.notes.view",
  },
  {
    name: "notes-student-history",
    icon: "archive",
    nombre: "Historial",
    url: "/notes/students/history",
    permissions: "student.notes.view",
  },
  {
    name: "notes-student-egreso",
    icon: "book-open",
    nombre: "Prueba de egreso",
    url: "/notes/student-egreso",
    permissions: "student.notes.view",
  },
  {
    name: "pensum-asesor",
    icon: "book",
    nombre: "Asesoria",
    url: "/pensum/asesor",
    permissions: "admin.asesoria.aprobar.registro",
  },
  {
    name: "pensum-pagador",
    icon: "book",
    nombre: "Asesoria",
    url: "/pensum/pagador",
    permissions: "admin.asesoria.aprobar.pagaduria",
  },
];

export default arrayRutas;

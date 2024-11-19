import type { RouteRecordRaw } from "vue-router";

export const NAME_ROUTE = "/notes";

// components
import Layout from "@/shared/LayoutComponent.vue";
import AlumnoList from "./pages/Alumnos/List.vue";
import DocenteList from "./pages/Docentes/List.vue";
import AlumnoEgreso from "./pages/Alumnos/Egreso.vue";
import AlumnoHistory from "./pages/Alumnos/History.vue";
import StudentsNote from "./pages/Docentes/StudentsNote.vue";

export const NotesRoute: RouteRecordRaw = {
  path: NAME_ROUTE,
  component: Layout,
  children: [
    {
      path: "docente",
      name: "notes-docente",
      component: DocenteList,
      meta: {
        rol: "docente.notes.view",
      },
    },
    {
      path: "docente/:id",
      name: "notes-docente-student",
      component: StudentsNote,
      meta: {
        rol: "docente.notes.view",
      },
    },
    {
      path: "student/history",
      name: "notes-student-history",
      component: AlumnoList,
      meta: {
        rol: "ROL_ESTUDIANTE_LIST_HISTORY",
      },
    },
    {
      path: "student",
      name: "notes-student",
      component: AlumnoList,
      meta: {
        rol: "student.notes.view",
      },
    },
    {
      path: "students/history",
      name: "notes-student-history",
      component: AlumnoHistory,
      meta: {
        rol: "student.notes.view",
      },
    },
    {
      path: "student-egreso",
      name: "notes-student-egreso",
      component: AlumnoEgreso,
      meta: {
        rol: "student.notes.view",
      },
    },
  ],
};

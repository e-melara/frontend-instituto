import type { RouteRecordRaw } from "vue-router";

export const NAME_ROUTE = "/notes";

export const NotesRoute: RouteRecordRaw = {
  path: NAME_ROUTE,
  component: () => import("@/shared/LayoutComponent.vue"),
  children: [
    {
      path: "docente",
      name: "notes-docente",
      component: () => import("./pages/Docentes/List.vue"),
      meta: {
        rol: "docente.notes.view",
      },
    },
    {
      path: "docente/:id",
      name: "notes-docente-student",
      component: () => import("./pages/Docentes/StudentsNote.vue"),
      meta: {
        rol: "docente.notes.view",
      },
    },
    {
      path: "student/history",
      name: "notes-student-history",
      component: () => import("./pages/Alumnos/List.vue"),
      meta: {
        rol: "ROL_ESTUDIANTE_LIST_HISTORY",
      },
    },
    {
      path: "student",
      name: "notes-student",
      component: () => import("./pages/Alumnos/List.vue"),
      meta: {
        rol: "student.notes.view",
      },
    },
    {
      path: "students/history",
      name: "notes-student-history",
      component: () => import("./pages/Alumnos/History.vue"),
      meta: {
        rol: "student.notes.view",
      },
    },
  ],
};

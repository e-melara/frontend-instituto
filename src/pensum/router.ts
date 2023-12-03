  import type { RouteRecordRaw } from "vue-router";

export const NAME_ROUTE = "/pensum";

export const PensumRoute: RouteRecordRaw = {
  path: NAME_ROUTE,
  component: () => import("@/shared/LayoutComponent.vue"),
  children: [
    {
      path: "asesor",
      name: "pensum-asesor",
      component: () => import("./pages/Admin/Pensum.vue"),
      meta: {
        rol: 'ROL_ASESORIA_LIST'
      }
    },
    {
      path: "student",
      name: "pensum-student",
      component: () => import("./pages/PensumList.vue"),
      meta: {
        rol: 'ROLE_PENSUM_STUDENT_LIST'
      }
    },
    {
      path: "asesoria",
      name: "pensum-asesoria",
      component: () => import("./pages/Asesoria.vue"),
      meta: {
        rol: 'ROLE_PENSUM_STUDENT_ASESORIA_VIEW'
      }
    },
  ],
};

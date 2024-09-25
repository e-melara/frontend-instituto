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
        rol: 'admin.asesoria.aprobar.registro'
      }
    },{
      path: "pagador",
      name: "pensum-pagador",
      component: () => import("./pages/Admin/Pensum.vue"),
      meta: {
        rol: 'admin.asesoria.aprobar.pagaduria'
      }
    },
    {
      path: "student",
      name: "pensum-student",
      component: () => import("./pages/PensumList.vue"),
      meta: {
        rol: 'student.pensum.view'
      }
    },
    {
      path: "asesoria",
      name: "pensum-asesoria",
      component: () => import("./pages/Asesoria.vue"),
      meta: {
        rol: 'student.pensum.create'
      }
    },
    // {
    //   path: "asesoria/view",
    //   name: "pensum-view",
    //   component: () => import("./pages/AsesoriaView.vue"),
    //   meta: {
    //     rol: 'student.pensum.view'
    //   }
    // },
  ],
};

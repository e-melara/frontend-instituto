import type { RouteRecordRaw } from "vue-router";

export const NAME_ROUTE = "/pensum";

import Asesoria from "./pages/Asesoria.vue";
import Layout from "@/shared/LayoutComponent.vue";
import Pensum from "./pages/Admin/Pensum.vue";
import PensumList from "./pages/PensumList.vue";

export const PensumRoute: RouteRecordRaw = {
  path: NAME_ROUTE,
  component: Layout,
  children: [
    {
      path: "asesor",
      name: "pensum-asesor",
      component: Pensum,
      meta: {
        rol: "admin.asesoria.aprobar.registro",
      },
    },
    {
      path: "pagador",
      name: "pensum-pagador",
      component: Pensum,
      meta: {
        rol: "admin.asesoria.aprobar.pagaduria",
      },
    },
    {
      path: "student",
      name: "pensum-student",
      component: PensumList,
      meta: {
        rol: "student.pensum.view",
      },
    },
    {
      path: "asesoria",
      name: "pensum-asesoria",
      component: Asesoria,
      meta: {
        rol: "student.pensum.create",
      },
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

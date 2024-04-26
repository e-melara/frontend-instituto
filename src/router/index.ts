import jwt from "jwt-decode";
import { createRouter, createWebHashHistory } from "vue-router";

import { useLocalStorage } from "@/composables";
import LoginPage from "@/pages/athenticate/LoginPage.vue";

// @ts-ignore
import HomeView from "@/pages/HomeView.vue";

// routes de los modulos
import { NotesRoute } from "@/notes/router";
import { PensumRoute } from "@/pensum/router";

const storage = useLocalStorage();

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // public pages
    {
      path: "/authenticate/login",
      name: "authenticate-login",
      component: LoginPage,
    },

    // pages private
    {
      path: "/",
      name: "home",
      component: () => import("@/shared/LayoutComponent.vue"),
      children: [
        { 
          path: "/dashboard", 
          name: "dasbhoard", 
          component: HomeView, 
          meta: {
            rol: 'dashboard.view'
          }
        },
      ],
    },
    PensumRoute,
    NotesRoute,
    // default
    {
      path: "/:pathMatch(.*)*",
      redirect: "/authenticate/login",
    },
  ],
});

router.beforeEach((to, _, next) => {
  const { path, meta } = to;
  const loggedIn = storage.getItemFn({ key: "token" });
  const publicPages = ["/authenticate/login", '/'];

  if (publicPages.includes(path)) {
    return next();
  }

  const decoded: any = jwt(loggedIn);
  if (decoded && decoded?.roles) {
    decoded.roles.push("dashboard.view");
    const rol = meta?.rol as string;
    if (rol && decoded.roles.includes(rol)) {
      return next();
    }
  }

  return next("/authenticate/login");
});

export default router;

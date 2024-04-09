import jwt from "jwt-decode";
import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores";
import { useLocalStorage } from "@/composables";
import LoginPage from "@/pages/athenticate/LoginPage.vue";

// @ts-ignore
import HomeView from "@/pages/HomeView.vue";

// routes de los modulos
import { NotesRoute } from "@/notes/router";
import { PensumRoute } from "@/pensum/router";

const storage = useLocalStorage();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        { path: "/dashboard", name: "dasbhoard", component: HomeView },
      ],
    },
    PensumRoute,
    NotesRoute,
    // default
    {
      path: "/:pathMatch(.*)*",
      redirect: () => ({ name: "home" }),
    },
  ],
});

router.beforeEach((to, _, next) => {
  const path = to.path;
  const meta = to.meta;
  const publicPages = ["/authenticate/login"];
  const authRequired = !publicPages.includes(path);
  const loggedIn = storage.getItemFn({ key: "token" });

  if (authRequired) {
    if (loggedIn === undefined) {
      next("/authenticate/login");
    }
    try {
      const decoded: any = jwt(loggedIn);
      if (["/", "/dashboard"].includes(path)) {
        return next();
      }
      if (decoded["roles"]) {
        const rol = meta.rol as string;
        if (decoded["roles"].includes(rol)) {
          return next();
        }
      }
      throw new Error();
    } catch (error) {
      next("/authenticate/login");
    }
  } else {
    return next();
  }
});

export default router;

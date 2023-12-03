import { storeToRefs } from "pinia";

import { useUtilsStore, useAuthStore } from "@/stores";
import type { INotify, ISideBarMenu } from "@/interfaces";

export const useUtil = () => {
  const store = useUtilsStore();
  const { loading, notify, menuItems, activeOverrlay, toggleSideBar, menu } =
    storeToRefs(store);

  const auth = useAuthStore();

  return {
    // state
    loading,
    notify,
    menu,
    menuItems,
    activeOverrlay,
    toggleSideBar,
    // getters

    // actions
    setLoading(value: boolean) {
      store.setLoading(value);
    },
    showAlert(notify: INotify) {
      store.showAlert(notify);
    },
    // validacion de roles
    hasRole(rol: string) {
      return auth.roles.includes(rol);
    },
    // menu
    setMenu(item: ISideBarMenu) {
      store.setNavActive(item);
    },
    openSideBar() {
      store.openSideBar();
    },
  };
};

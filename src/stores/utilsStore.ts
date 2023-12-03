import { ref } from "vue";
import { defineStore } from "pinia";

import jsonDataMenu from "@/api/menu.json";
import type { INotify, IMenu, ISideBarMenu } from "@/interfaces";

export const useUtilsStore = defineStore("useUtilsStore", () => {
  const notify = ref<INotify>({});
  const loading = ref<boolean>(false);
  const toggleSideBar = ref<boolean>(true);
  const activeOverrlay = ref<boolean>(true);
  const menuItems = ref<ISideBarMenu[]>(jsonDataMenu.data as any);

  const menu = ref<IMenu>({
    width: 0,
    menuWidth: 0,
    hideLeftArrow: false,
    hideRightArrow: false,
  });

  return {
    // state
    loading,
    notify,
    activeOverrlay,
    toggleSideBar,
    menuItems,
    menu,
    // getters
    //  actions
    setLoading(value: boolean) {
      loading.value = value;
    },
    showAlert(inotify: INotify) {
      notify.value = inotify;
    },
    openSideBar() {
      toggleSideBar.value = !toggleSideBar.value;
      if (window.innerWidth < 991) {
        activeOverrlay.value = true;
      } else {
        activeOverrlay.value = false;
      }
    },
    setNavActive(item: ISideBarMenu) {
      if (!item.active) {
        menuItems.value.forEach((menu) => {
          if (menuItems.value.includes(item)) {
            menu.active = false;
          }
          if (!menu.children) {
            return false;
          }
          menu.children.forEach((sub) => {
            if (menu.children?.includes(sub)) {
              sub.active = false;
            }
          });
        });
      }
      item.active = !item.active;
    },
  };
});

<script lang="ts" setup>
import { RouterLink, useRoute } from "vue-router";
import { toRefs, onMounted, onUnmounted, onBeforeMount } from "vue";

import { useAuth, useUtil } from "@/composables";
import type { ISideBarMenu } from "@/interfaces";
import logoIcon from "@/assets/images/logo/logo-icon.png";

const util = useUtil();
const auth = useAuth();

const { rutas } = toRefs(auth);
const { menuItems, activeOverrlay, toggleSideBar, menu } = toRefs(util);

const { setMenu } = util;

const setNavActive = (item: ISideBarMenu) => {
  setMenu(item);
  if (window.innerWidth > 991) {
    activeOverrlay.value = true;
  } else {
    activeOverrlay.value = false;
  }
};

const hideSecondMenu = () => {
  if (window.innerWidth < 991) {
    activeOverrlay.value = false;
    toggleSideBar.value = false;
    menuItems.value.forEach((menu) => {
      menu.active = false;
    });
  }
};

const handleResize = () => {
  menu.value.width = window.innerWidth - 450;
};

onMounted(() => {
  const route = useRoute();
  menuItems.value.forEach((item) => {
    if (item.path === route.path) {
      setMenu(item);
    }
    if (!item.children) return false;
    item.children.forEach((sub) => {
      if (sub.path === route.path) {
        setMenu(item);
      }
    });
  });
});

onBeforeMount(() => {
  window.addEventListener("resize", handleResize);
  handleResize();

  setTimeout(() => {
    const element = document.querySelector("#myDiv") as HTMLDivElement;
    menu.value.menuWidth = element.offsetWidth;
    const bandera = menu.value.menuWidth > window.innerWidth;

    menu.value.hideRightArrow = false;
    menu.value.hideLeftArrow = !bandera;
  }, 500);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="d-flex" id="sidebar-menu" style="margin-top: 10px;">
    <ul class="sidebar-links custom-scrollbar" id="myDiv" style="margin: 0px">
      <li class="back-btn">
        <RouterLink to="/">
          <img :src="logoIcon" alt="image logo" />
        </RouterLink>
        <div class="mobile-back text-right">
          <span>Back</span>
          <i class="fa fa-angle-right pl-2" aria-hidden="true"></i>
        </div>
      </li>
      <li v-for="(item, index) in rutas" :key="index" class="sidebar-list py-2">
        <router-link :to="item.url" class="sidebar-link sidebar-title" exact>
          <vue-feather class="top" :type="item.icon" />
          <span>{{ item.nombre }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.page-wrapper.compact-wrapper
  .page-body-wrapper
  div.sidebar-wrapper
  .sidebar-main
  .sidebar-links
  > li.active
  .sidebar-link
  .according-menu
  i:before {
  content: "";
}
.page-wrapper.compact-wrapper .page-body-wrapper .according-menu {
  right: -6px;
  top: 13px;
}
</style>

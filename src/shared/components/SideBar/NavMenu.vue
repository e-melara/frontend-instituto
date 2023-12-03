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
  <div class="d-flex" id="sidebar-menu">
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
      <li v-for="(item, index) in rutas" :key="index" class="sidebar-list">
        <router-link :to="item.url" class="sidebar-link sidebar-title" exact>
          <vue-feather class="top" :type="item.icon" />
          <span>{{ item.nombre }}</span>
        </router-link>
      </li>
      <!-- <li
        v-for="(item, index) in menuItems"
        :key="index"
        class="sidebar-list"
        :class="{
          active: item.active,
          'sidebar-main-title': item.type === 'headtitle',
        }"
      >
        <div v-if="item.type === 'headtitle'">
          <h6 class="lan-1">{{ item.headTitle1 }}</h6>
          <p class="lan-2">{{ item.headTitle2 }}</p>
        </div>
        <label v-if="item.badgeType" :class="`badge badge-${item.badgeType}`">
          {{ item.badgeValue }}
        </label>
        <a
          class="sidebar-link sidebar-title"
          v-if="item.type === 'sub'"
          @click="setNavActive(item)"
        >
          <vue-feather :type="item.icon" class="top"></vue-feather>
          <span>{{ item.title }}</span>
          <div class="according-menu" v-if="item.children">
            <vue-feather type="chevron-down" />
          </div>
        </a>
        <RouterLink
          :to="item.path || ''"
          class="sidebar-link sidebar-title"
          v-if="item.type === 'link'"
          router-link-exact-active
          exact
          @click="hideSecondMenu"
        >
          <vue-feather class="top" :type="item.icon"></vue-feather>
          <span>{{ item.title }}</span>
          <vue-feather type="chevron-down" v-if="item.children" />
        </RouterLink>
        <ul
          class="sidebar-submenu"
          v-if="item.children"
          :class="{ 'menu-open': item.active }"
        >
          <li
            :class="{ active: children.active }"
            v-for="(children, index) in item.children"
            :key="index"
          >
            <a
              @click="setNavActive(item)"
              class="submenu-title"
              v-if="children.type === 'sub'"
            >
              {{ children.title }}
            </a>
            <RouterLink
              class="submenu-title"
              :to="children.path || ''"
              v-if="children.type === 'link'"
              router-link-exact-active
              exact
              @click="hideSecondMenu"
            >
              {{ children.title }}
              <i
                class="fa fa-angle-right pull-right mt-1"
                v-if="children.children"
              ></i>
            </RouterLink>
          </li>
        </ul>
      </li> -->
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

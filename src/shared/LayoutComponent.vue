<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { RouterView, useRouter } from "vue-router";
// @ts-ignore
import TapTop from "./TapTop.vue";
// @ts-ignore
import Footer from "./FooterComponent.vue";
// @ts-ignore
import Header from "./HeaderComponent.vue";
// @ts-ignore
import Sidebar from "./SidebarComponent.vue";
import type { IUser } from "@/interfaces";
import { useLocalStorage, useAuth, useUtil } from "@/composables";

const auth = useAuth();
const util = useUtil();
const storage = useLocalStorage();

const { activeOverrlay, toggleSideBar } = toRefs(util);

const toggleSideBarFn = () => {
  util.openSideBar();
  activeOverrlay.value = false;
};

onMounted(() => {
  const token = storage.getItemFn({ key: "token" });
  const persona = storage.getItemFn({ key: "persona" });
  auth.setData(token, persona as IUser);
});
</script>

<template>
  <div class="page-wrapper compact-wrapper color-sidebar">
    <div class="page-header" :class="{ close_icon: toggleSideBar }">
      <!-- header -->
      <Header />
    </div>
    <div class="page-body-wrapper">
      <div
        class="sidebar-wrapper"
        sidebar-layout="default-sidebar"
        :class="{ close_icon: toggleSideBar }"
      >
        <!-- sidebar -->
        <Sidebar @clicked="toggleSideBarFn" />
      </div>
      <div class="page-body">
        <RouterView class="view" v-slot="{ Component }">
          <component :is="Component" />
        </RouterView>
      </div>
      <Footer />
    </div>
    <TapTop />
  </div>
</template>

<style scoped></style>

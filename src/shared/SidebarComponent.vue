<script setup lang="ts">
import { RouterLink } from "vue-router";

// @ts-ignore
import Nav from "./components/SideBar/Nav.vue";
const emits = defineEmits(["clicked"]);
const toggleSideBar = () => {
  emits("clicked");
};
</script>

<template>
  <div class="logo-wrapper">
    <!-- <Logo /> -->
    <div class="back-btn" @click="toggleSideBar">
      <vue-feather type="chevron-left"></vue-feather>
    </div>
    <div class="toggle-sidebar" @click="toggleSideBar">
      <vue-feather
        type="grid"
        id="sidebar-toggle"
        class="status_toggle middle"
      ></vue-feather>
    </div>
  </div>
  <div class="logo-icon-wrapper">
    <RouterLink to="/dashboard">
      <!-- <img style="width: 30px" :src="logoIcon" alt="icon" class="img-fluid" /> -->
    </RouterLink>
  </div>
  <Nav />
</template>

<style scoped></style>

<script setup lang="ts">
// @ts-ignore
import NavMenu from "./NavMenu.vue";
</script>

<template>
  <nav class="sidebar-main" id="sidebar-main">
    <li class="left-arrow">
      <vue-feather type="arrow-left"></vue-feather>
    </li>
    <NavMenu />
    <li class="right-arrow">
      <vue-feather type="arrow-right"></vue-feather>
    </li>
  </nav>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
// @ts-ignore
import Logo from "./components/Header/Logo.vue";
// @ts-ignore
import Maxime from "./components/Header/Maxime.vue";
// @ts-ignore
import Profile from "./components/Header/Profile.vue";

</script>

<template>
  <div class="header-wrapper m-0">
    <logo />
    <div class="left-header col horizontal-wrapper pl-0"></div>
    <div class="nav-right col-8 pull-right right-header p-0">
      <ul class="nav-menus">
        <li class="maxime">
          <Maxime />
        </li>
        <Profile />
      </ul>
    </div>
  </div>
</template>

<style scoped></style>

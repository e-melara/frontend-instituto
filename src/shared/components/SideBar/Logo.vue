<script setup lang="ts">
import { RouterLink } from "vue-router";
import LogoLight from "@/assets/images/logo/utla.png";
import LogoDark from "@/assets/images/logo/utla.png";
</script>

<template>
  <RouterLink to="/">
    <img
      style="width: 40px"
      :src="LogoLight"
      class="img-fluid for-light"
      alt="image ligth"
    />
    <img
      style="width: 40px"
      :src="LogoDark"
      class="img-fluid for-dark"
      alt="image ligth"
    />
  </RouterLink>
</template>

<style lang="scss" scoped></style>

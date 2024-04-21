<script setup lang="ts">
import { RouterLink } from "vue-router";
import imageLogo from "@/assets/images/logo/utla.png";

import { useUtil } from '@/composables';
import { toRefs } from "vue";

const util = useUtil()
const { activeOverrlay } = toRefs(util)

const open = () => {
  util.openSideBar()
  activeOverrlay.value = false;
};
</script>

<template>
  <div class="header-logo-wrapper">
    <div class="logo-wrapper">
      <RouterLink to="/">
        <!-- <img
          :src="imageLogo"
          style="width: 60px"
          alt="image logo"
          class="img-fluid"
        /> -->
      </RouterLink>
    </div>
    <div class="toggle-sidebar" @click="open">
      <vue-feather
        type="align-center"
        id="sidebar-toggle"
        class="sidebar_toggle middle sidebar-toggle"
      ></vue-feather>
    </div>
  </div>
</template>

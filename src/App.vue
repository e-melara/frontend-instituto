<script setup lang="ts">
import { toRefs } from "vue";
import { RouterView } from "vue-router";

import { useUtil } from "@/composables/useUtil";
// @ts-ignore
import AlertToast from "@/shared/components/AlertToast.vue";

const util = useUtil();
const { loading } = toRefs(util);
</script>

<template>
  <div class="loader-wrapper" :class="{ loderhide: !loading }">
    <div class="loader-index">
      <span></span>
    </div>
  </div>
  <RouterView />
  <AlertToast />
</template>

<style scoped>
.loader-wrapper.loderhide {
  display: none;
}
</style>

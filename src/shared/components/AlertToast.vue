<script setup lang="ts">
import Toast from "primevue/toast";
import { watch, provide } from "vue";
import { useToast } from "primevue/usetoast";

import { useUtil } from "@/composables";
import type { INotify } from "@/interfaces";

const util = useUtil();
const toast = useToast();

watch(util.notify, (newValue) => {
  const opts = {
    ...newValue,
    life: 3000,
    group: "br",
  };
  toast.add(opts);
});

provide("notify", (args: INotify) => {
  util.showAlert(args);
});
</script>

<template>
  <Toast position="top-right" group="br" />
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
// @ts-ignore
import PensumList from "./PensumList.vue";
import { useAuth } from "@/composables";

const auth = useAuth();
const router = useRouter();

onBeforeMount(() => {
  if (false) {
    router.replace({ name: "pensum-asesor" });
  } else {
    router.replace({ name: "pensum-student" });
  }
});
</script>

<template></template>

<style scoped></style>

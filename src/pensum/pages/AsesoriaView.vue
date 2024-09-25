<template>
  <BreadCumbs title="Asesoria" main="Pensum" :button="true" />
  <div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, watch } from "vue";
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import ListEnrolled from "../components/Asesoria/ListEnrolled.vue";
// @ts-ignore
import { usePensum } from "@/pensum/composables/usePensum";
</script>

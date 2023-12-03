<template>
  <h3>Ciclo</h3>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

import { useNoteStore } from "@/stores";

const store = useNoteStore();

onMounted(() => {
  store.getNotasCicloOrHistory({ q: "CICLO" });
});
</script>

<style></style>

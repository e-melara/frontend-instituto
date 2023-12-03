<template>
  <BreadCumbs title="Cargas Academicas" :button="true" />
  <div class="file-content">
    <div class="card">
      <b-table v-if="data" :fields="headers" :items="data.cargas">
        <template #cell(nommate)="{ item }">
          {{ item.materia.nommate }}
        </template>
        <template #cell(actions)="row">
          <b-button
            variant="success"
            @click="goToVerEstudiantes(row.item)"
            size="sm"
            class="mr-1"
          >
            Ver estudiantes
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useNoteStore } from "@/stores";

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
import type { ICarga } from "@/notes/interfaces";

const router = useRouter();
const store = useNoteStore();
const { data } = storeToRefs(store);

// headers table
const headers = [
  { key: "codmate", label: "Codigo", sortable: false },
  { key: "nommate", label: "Materia", sortable: false },
  { key: "dias", label: "Dias", sortable: false },
  { key: "hora", label: "Horas", sortable: false },
  { key: "actions", label: "" },
];

// actions
const goToVerEstudiantes = (item: ICarga) => {
  router.replace({
    name: "notes-docente-student",
    params: { id: item.codcarga },
  });
};

onMounted(() => store.getListaCargasDocente());
</script>

<style></style>

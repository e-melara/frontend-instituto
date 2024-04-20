<template>
  <BreadCumbs title="Materias" :button="true" />
  <div class="file-content">
    <div class="card">
      <b-table v-if="data" :fields="headers" :items="(data as any)">
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
  { key: "materia_codigo", label: "Codigo", sortable: false },
  { key: "materia_nombre", label: "Materia", sortable: false, with: '50%' },
  { key: "horario", label: "Dias", sortable: false },
  { key: "actions", label: "", width: '50px' },
];

// actions
const goToVerEstudiantes = (item: any) => {
  router.replace({
    name: "notes-docente-student",
    params: { id: item.id },
  });
};

onMounted(() => store.getListaCargasDocente());
</script>

<style></style>

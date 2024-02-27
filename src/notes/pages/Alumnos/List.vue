<template>
  <BreadCumbs title="Notas" :button="true" />

  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr class="header-table table-dark">
                <th scope="col">Codigo</th>
                <th scope="col">Materia</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="row in subjectsStudent" :key="row.id">
                <tr>
                  <td scope="row">{{ row.codigo }}</td>
                  <td>{{ row.materia }}</td>
                  <td style="width: 10%">
                    <b-button
                      size="sm"
                      class="mr-1"
                      variant="success"
                      @click="viewNoteStudent(row)"
                    >
                      Ver notas
                    </b-button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
      </b-col>
    </b-row>
  </b-container>
  <b-modal 
    v-model="open"
    :title="titleModal"
    size="xl"
    no-close-on-esc
    no-close-on-backdrop
  >
  <b-container fluid>
    <TableLayout />
  </b-container>
  </b-modal>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

// // @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
import TableLayout from "./components/TableLayout.vue";

import { useNoteStore } from "@/stores";

const store = useNoteStore();
const { subjectsStudent } = storeToRefs(store);

const titleModal = ref("");
const open = ref<boolean>(false);

// actions 
const viewNoteStudent = async (row: object) => {
  await store.getNotaViewId((row as any).id);
  titleModal.value = (row as any).materia;
  open.value = true;
};

onMounted(() => store.getNotasEstudiante());
</script>

<style scoped>
.table {
  font-size: 0.8rem;
  border: 1px solid black !important;
}
.header-table th {
  background-color: #2f3c4e !important;
  font-weight: bold !important;
  font-size: 0.95rem !important;
  color: white !important;
}
</style>

<template>
  <BreadCumbs title="Pruebas de egreso" :button="true" />

  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <b-card>
          <table class="table table-striped table-striped-columns">
            <thead class="header-table">
              <tr>
                <th class="text-left font-weight-bold">MATERIA</th>
                <th class="text-center">NOTA</th>
                <th class="text-center">REPOSICION</th>
                <th class="text-center">NOTA FINAL</th>
                <th class="text-center font-weight-bold">RESULTADO</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="materia in egreso">
                <td class="text-left font-weight-bold">
                  {{ materia?.materia }}
                </td>
                <td class="text-center">
                  {{ filterNumeric(materia?.nota_1, 1, true) }}
                </td>
                <td class="text-center">
                  {{ filterNumeric(materia?.nota_2, 1, true) }}
                </td>
                <td class="text-center">
                  {{ filterNumeric(materia?.nota_3, 1, true) }}
                </td>
                <td class="text-center font-weight-bold">
                  {{ materia?.estado }}
                </td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import { filterNumeric } from "@/utils/functions";
import { useNoteStore } from "@/stores";
import BreadCumbs from "@/shared/BreadCumbs.vue";
const store = useNoteStore();

const { egreso } = storeToRefs(store);

onMounted(() => store.getNotaEgreso());
</script>

<style>
.table {
  font-size: 1rem;
  border: 1px solid black !important;
}
.header-table th {
  background-color: #2f3c4e !important;
  font-weight: bold !important;
  font-size: 0.95rem !important;
  color: white !important;
}
.font-weight-bold {
  font-weight: bold;
}
</style>

<template>
  <BreadCumbs :title="title" :button="true" />

  <b-container fluid>
    <b-row>
      <b-col cols="12">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <template v-for="nota in notas" :key="nota.ciclo">
                <tr>
                  <td colspan="4"></td>
                  <td colspan="6" class="text-end">
                    <h5>Ciclo: {{ nota.ciclo }}</h5>
                  </td>
                </tr>
                <tr class="header-table table-dark">
                  <th scope="col">Codigo</th>
                  <th scope="col">Materia</th>
                  <th scope="col">Docente</th>
                  <th scope="col" class="text-center">Nota 1</th>
                  <th scope="col" class="text-center">Nota 2</th>
                  <th scope="col" class="text-center">Nota 3</th>
                  <th scope="col" class="text-center">Nota 4</th>
                  <th scope="col" class="text-center">Nota 5</th>
                  <th scope="col" class="text-center">Promedio</th>
                  <th scope="col" class="text-center"></th>
                </tr>
                <tr v-for="materia in nota.materias" :key="materia.codcarga">
                  <td scope="row">{{ materia.codmate }}</td>
                  <td>{{ materia.nommate }}</td>
                  <td>{{ materia.nombres }} {{ materia.apellidos }}</td>
                  <td class="text-center">
                    {{ formmatedNumber(materia.nota1) }}
                  </td>
                  <td class="text-center">
                    {{ formmatedNumber(materia.nota2) }}
                  </td>
                  <td class="text-center">
                    {{ formmatedNumber(materia.nota3) }}
                  </td>
                  <td class="text-center">
                    {{ formmatedNumber(materia.nota4) }}
                  </td>
                  <td class="text-center">
                    {{ formmatedNumber(materia.nota5) }}
                  </td>
                  <td class="text-center">
                    {{ formmatedNumber(materia.promedio) }}
                  </td>
                  <td class="text-center">
                    <span class="badge bg-primary">{{ materia.estado }}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";

import { useNoteStore } from "@/stores";
import { storeToRefs } from "pinia";

const store = useNoteStore();
const title = ref<string>("Historial de Notas");

const { notas } = storeToRefs(store);

onUpdated(() => {
  funCargarData();
});

onMounted(() => {
  funCargarData();
});

const funCargarData = () => {
  const route = useRoute();
  const name = route.name;
  title.value =
    name === "notes-student-history" ? "Historial de Notas" : "Notas del Ciclo";
  store.getNotasCicloOrHistory({
    q: name === "notes-student-history" ? "HISTORY" : "CICLO",
  });
};

const formmatedNumber = (value: number) => Number(value).toFixed(2);
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

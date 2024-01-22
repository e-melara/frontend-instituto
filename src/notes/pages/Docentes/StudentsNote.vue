<template>
  <BreadCumbs main="Cargas Academicas" :title="title" :button="true" />
  <div class="file-content">
    <b-card no-body>
      <b-card-body>
        <b-card-text>
          <b-row>
            <b-col cols="8">
              <h5>Listado de estudiantes</h5>
            </b-col>
            <b-col cols="4" class="d-flex justify-content-end">
              <b-button-group>
                <b-button variant="primary" @click="downloadFileNotes"
                  >Descargar Listado</b-button
                >
                <b-button @click="openModal">Subir Notas</b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card-body>
      <b-table
        v-if="carga"
        :fields="headers"
        :items="carga"
        class="text-center"
        striped
        bordered
        borderless
        small
        hover
      >
        <template #cell(estudiante)="{ item }">
          {{ item.alumno.apellidos }} {{ item.alumno.nombres }}
        </template>
        <template #cell(nota1)="{ item }">
          {{ formatDouble(item.nota1) }}
        </template>
        <template #cell(nota2)="{ item }">
          {{ formatDouble(item.nota2) }}
        </template>
        <template #cell(nota3)="{ item }">
          {{ formatDouble(item.nota3) }}
        </template>
        <template #cell(nota4)="{ item }">
          {{ formatDouble(item.nota4) }}
        </template>
        <template #cell(nota5)="{ item }">
          {{ formatDouble(item.nota5) }}
        </template>
        <template #cell(promedio)="{ item }">
          {{ formatDouble(item.promedio) }}
        </template>
      </b-table>
    </b-card>
  </div>
  <ModalSubirNotas
    :show="open"
    @close="handlerClose"
    @send="recibeNotes"
    :carga="carga"
    v-if="carga"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";

import { useNoteStore, useUtilsStore } from "@/stores";
import { excelExportFileCuadro } from "@/exportacion/cuadro-notas";

// componentes
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import ModalSubirNotas from "../../components/Docente/SubirNotasModal.vue";

// variables
const route = useRoute();
const util = useUtilsStore();
const store = useNoteStore();

const { carga, open } = storeToRefs(store);

// headers table
const headers = [
  { key: "carnet", label: "Carnet", sortable: false },
  { key: "estudiante", label: "Estudiante", sortable: false },
  // { key: "nota1", label: "Nota 1", sortable: false },
  // { key: "nota2", label: "Nota 2", sortable: false },
  // { key: "nota3", label: "Nota 3", sortable: false },
  // { key: "nota4", label: "Nota 4", sortable: false },
  // { key: "nota5", label: "Nota 5", sortable: false },
  // { key: "promedio", label: "Promedio", sortable: false },
];

const title = computed(() => {
  if (carga.value?.materia) {
    return carga.value.materia.toString();
  }
  return "";
});

// actions
const downloadFileNotes = async () => {
  const values = carga.value;
  if (values) {
    await excelExportFileCuadro(values);
  }
};

const openModal = () => {
  store.toggleShowModal(true);
};

const handlerClose = () => {
  store.toggleShowModal();
};

const formatDouble = (value: string) => {
  return parseFloat(value).toFixed(2);
}

const recibeNotes = (params: any) => {
  store.sendNotesCarga(params).then(() => {
    util.showAlert({
      summary:'Exito!',
      detail: 'Proceso realizado con exito',
      severity: 'success'
    });
  });
};

onMounted(() => {
  const { id } = route.params;
  store.getDataCargaAcademica(+id);
});
</script>

<style></style>

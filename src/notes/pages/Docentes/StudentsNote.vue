<template>
  <BreadCumbs main="Cargas Academicas" :title="title" :button="true" />
  <div class="file-content">
    <b-card no-body>
      <b-card-body>
        <b-card-text>
          <b-row>
            <b-col cols="8">
              <h5>{{ `Materia: ${data?.materia?.nombre}` || 'Listado de estudiantes' }}</h5>
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
        :fields="headers"
        :items="(carga as any)"
        striped
        bordered
        borderless
        small
        hover
      >
        <template #cell(estudiante)="{ item }">
          {{ item.alumno.apellidos }} {{ item.alumno.nombres }}
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

const { open, carga, data } = storeToRefs(store);

// headers table
const headers = [
  { key: "carnet", label: "Carnet", sortable: false },
  { key: "estudiante", label: "Estudiante", sortable: false, class:'text-left' },
];

const title = computed(() => {
  if (carga.value?.materia) {
    return carga.value.materia.toString();
  }
  return "";
});

const downloadFileNotes = async () => {
  const values = carga.value;
  if (values) {
    await excelExportFileCuadro(values, data);
  }
};

const openModal = () => {
  store.toggleShowModal(true);
};

const handlerClose = () => {
  store.toggleShowModal();
};

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
  store.getDataConfigMateria(+id);
  store.getDataCargaAcademica(+id);
});
</script>
<template>
  <BreadCumbs main="Cargas Academicas" :title="title" :button="true">
    <template #back>
      <button class="btn btn-primary align-items-center d-flex justify-content-center" 
        style=" margin-right: 15px;padding: 0px 20px;" @click="back">
        <vue-feather type="arrow-left" />
      </button>
    </template>
  </BreadCumbs>
  <div class="file-content">
    <b-card no-body>
      <b-tabs class="tabs-student" card>
        <b-tab title="Alumnos" active>
          <b-card-text>
            <b-card no-body>
              <b-card-body>
                <b-card-text>
                  <b-row>
                    <b-col cols="8">
                      <h5>Listado de estudiantes</h5>
                    </b-col>
                    <b-col cols="4" class="d-flex justify-content-end">
                      <b-button-group>
                        <b-button title="Descargar Listado" variant="primary" @click="downloadFileNotes">
                          <vue-feather type="download-cloud" />
                        </b-button>
                        <b-button @click="openModal" title="Subir Notas">
                          <vue-feather type="upload-cloud" />
                        </b-button>
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
                  {{ item?.alumno?.apellidos }} {{ item?.alumno?.nombres }}
                </template>
                <template #cell(nota_final)="{item}">
                  {{ numberOfColumns !== 0 ? filterNumeric(item[`nota_${numberOfColumns}`]) : filterNumeric(0) }}
                </template>
              </b-table>
            </b-card>
          </b-card-text>
        </b-tab>
        <b-tab title="Notas">
          <table-notes :config="data?.config" :alumnos="carga as any" />
        </b-tab>
      </b-tabs>
    </b-card>
    <!--  -->
  </div>
  <ModalSubirNotas
    :show="open"
    @close="handlerClose"
    @send="recibeNotes"
    :carga="carga"
    :data="data"
    v-if="carga && data"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";

import { useNoteStore, useUtilsStore } from "@/stores";
import { excelExportFileCuadro } from "@/exportacion/cuadro-notas";

// componentes
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import ModalSubirNotas from "../../components/Docente/SubirNotasModal.vue";
// @ts-ignore
import TableNotes from '../../components/Notes/TableNote.vue';

import { filterNumeric } from '@/utils/functions';
import { stringTableFn } from "@/utils/tablesStringNotes";

// variables
const route = useRoute();
const router = useRouter();
const util = useUtilsStore();
const store = useNoteStore();

const numberOfColumns = ref(0);

const { open, carga, data } = storeToRefs(store);

watch(data, (async (value) => {
  const stringTable = await stringTableFn(value.config);
  numberOfColumns.value = stringTable.number_of_columns;
}));

// headers table
const headers = [
  { key: "carnet", label: "Carnet", sortable: false },
  { key: "estudiante", label: "Estudiante", sortable: false, class:'text-left' },
  { key: "nota_final", label: "Nota", sortable: false, class:'text-center' },
];

const title = computed(() => {
  if (data.value?.materia?.nombre) {
    return data.value.materia?.nombre.toString();
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

const recibeNotes = async (params: any) => {
  store.sendNotesCarga(params).then(async(resp: any) => {    
    if(resp['response'].status === 200) {
      await store.getDataConfigMateria(+route.params.id);
      util.showAlert({
        summary:'Exito!',
        detail: 'Proceso realizado con exito',
        severity: 'success'
      });
    } else {
      util.showAlert({
        summary:'Error!',
        detail: 'Proceso no realizado',
        severity: 'error'
      });
    }
  });
};

const back = () => {
  router.push({ name: "notes-docente" });
};

onMounted(() => {
  const { id } = route.params;
  store.getDataConfigMateria(+id);
  store.getDataCargaAcademica(+id);
});
</script>

<style>
.tabs-student {
  .card-header {
    background-color: #7265fc;
    padding-bottom: 8px !important;
    button.nav-link {
      text-transform: uppercase;
      color: #fff;
      &.active {
        color: #000;
      }
    }
  }
}
</style>
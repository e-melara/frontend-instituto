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
                :items="carga"
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
                <template #cell(estado)="{ item }">
                  <b-alert show :variant="varianteColor(item.estado)" class="p-0">
                    {{ item.estado.codigo === '001' ? 'Aprobado' : item.estado.codigo === '002' ? 'Reprobado' : 'En curso'}}
                  </b-alert>
                </template>
              </b-table>
            </b-card>
          </b-card-text>
        </b-tab>
        <b-tab title="Notas">
          <table-notes :config="data?.config" :alumnos="carga"></table-notes>
        </b-tab>
        <b-tab title="Historial">
          <b-table
            :fields="header_history"
            :items="history"
            striped
            bordered
            borderless
            small
            hover
            show-empty
            class="table-middle"
          >
          <template #empty>
            <h4 class="text-center">No hay registro por el momento</h4>
          </template>
          <template #cell()="{ item }">
            <strong>{{ nameTransform(item.key_note) }}</strong>
          </template>
          <template #cell(created_at)="{ item }">
            {{ timeAgo(item.created_at) }}
          </template>
          <template #cell(actions)="{ item }">
            <b-button @click="downloadPDF(item)">
              <vue-feather type="download-cloud" />
            </b-button>
          </template>
        </b-table>
        </b-tab>
      </b-tabs>
    </b-card>
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
import { timeAgo } from '@/utils/functions';
import { excelExportFileCuadro } from "@/exportacion/cuadro-notas";

// componentes
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import ModalSubirNotas from "../../components/Docente/SubirNotasModal.vue";
// @ts-ignore
import TableNotes from '../../components/Notes/TableNote.vue';

// @ts-ignore
import { filterNumeric, nameTransform } from '@/utils/functions';
import { stringTableFn } from "@/utils/tablesStringNotes";

// variables
const route = useRoute();
const router = useRouter();
const util = useUtilsStore();
const store = useNoteStore();

const numberOfColumns = ref(0);

//@ts-ignore
const { open, carga, data, history } = storeToRefs(store);

watch(data, (async (value) => {
  const stringTable = await stringTableFn(value.config);
  numberOfColumns.value = stringTable.number_of_columns;
}));

// headers table
const headers = [
  { key: "carnet", label: "Carnet", sortable: false },
  { key: "estudiante", label: "Estudiante", sortable: false, class:'text-left' },
  { key: "nota_final", label: "Nota", sortable: false, class:'text-center' },
  { key: "estado", label: "", sortable: false, class:'text-center', variant: 'info', stickyColumn: true,},
];

const header_history = [
  { key: "key_note", label: "Nota", sortable: false },
  { key: "created_at", label: "Fecha", sortable: false, class: 'text-center width-200' },
  { key: 'actions', label: '', class: 'text-center width-100', sortable: false },
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
      await reloadData();
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

const reloadData = async () => {
  const { id } = route.params;
  await Promise.all([
    store.getDataConfigMateria(+id),
    store.getDataCargaAcademica(+id),
    store.getHistorialNote(+id)
  ]);
};

const varianteColor = ({codigo} : any )  => {
  switch (codigo) {
    case '001':
      return 'success';
    case '002':
      return 'danger';
    case '003':
      return 'primary';
  }
};

const downloadPDF = (item: any) => {
  window.open(`${import.meta.env.VITE_APP_BASE_URL}/v1/materias/${item.id}/download`, '_blank');
};

onMounted(() => {
  reloadData();
});
</script>

<style lang="scss">
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
.width-100 { width: 100px; }
.width-200 { width: 200px; }
.table-middle td {
  vertical-align: middle;
}
</style>
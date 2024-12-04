<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import TableAsesoria from "../../components/Asesoria/TableAsesoria.vue";
import TableAsesoriaAdmin from "../../components/Asesoria/Admin/TableAsesoria.vue";

import Pensum from "@/pensum/components/Pensum/List.vue";
import { usePensumStore } from "@/stores/usePensum";

const route = useRoute();
const table = ref(null);
const store = usePensumStore();
const item = ref<number>(0);
const open = ref<boolean>(false);
const estado = ref<number | null>(null);

const { pensumList, activeAdvice, carrera, student } = storeToRefs(store);

watch(
  () => route.name,
  () => routeNameParams()
);

const routeNameParams = () => {
  estado.value = route.name === "pensum-asesor" ? 7 : 8;
  // @ts-ignore
  table.value?.refresh({ estado: estado.value });
};

const handlerViewPensum = ({ carnet, id }: any) => {
  store.fetchPensum(carnet).then(() => {
    open.value = true;
    item.value = id;
  });
};

const handlerValidar = (status: string) => {
  store.validarAsesoria(item.value, status).then(() => {
    open.value = false;
    item.value = 0;
    table.value?.refresh({ estado: estado.value });
  });
};

const handlerAprobar = (id: number) => {
  store.validarAsesoria(id, '009').then(() => {
    table.value?.refresh({ estado: estado.value });
  });
};

onMounted(() => {
  routeNameParams();
});
</script>

<template>
  <BreadCumbs title="Asesoria" main="Pensum" :button="true" />
  <div class="file-content">
    <b-card no-body>
      <b-tabs class="tabs-student" card>
        <b-tab title="Asesoria">
          <b-card-text>
            <b-card no-body>
              <b-card-body>
                <b-row>
                  <b-col cols="12">
                    <table-asesoria
                      v-if="estado"
                      ref="table"
                      :per_page="5"
                      :estado="estado"
                      @view-pensum="handlerViewPensum"
                      @aprobar-asesoria="handlerAprobar"
                    />
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>

  <b-modal
    hide-footer
    no-close-on-esc
    no-close-on-backdrop
    size="xll"
    scrollable
    v-model="open"
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div class="card">
            <table-asesoria-admin
              :student="student"
              :carrera="carrera"
              @validar="handlerValidar"
              :enrolled="activeAdvice?.enrolled"
            />
          </div>
        </div>
        <div class="col-6">
          <pensum v-if="open" :items="pensumList" />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<style>
.modal-dialog.modal-xll {
  max-width: 99%;
}
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
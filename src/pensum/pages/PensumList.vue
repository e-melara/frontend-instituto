<template>
  <BreadCumbs title="Pensum" :button="true" />
  <div class="card" v-if="!loading">
    <div class="card-header">
      <div>
        <div class="header-top">
          <h5 class="m-0">Materias</h5>
          <div class="" style="float: right" v-if="activeAdvice">
            <b-button @click="goToEnrolled">Iniciar asesoria</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <Leyenda :carrera="carrera" />
      <List :items="pensumList" />
    </div>
  </div>
  <div v-else>
    <div class="d-flex justify-content-center align-items-center" style="height: 80vh;">
      <b-spinner type="grow" style="width: 6rem; height: 6rem;" variant="primary" label="Cargando..."  />
    </div>
  </div>
  <b-modal v-model="open" size="xxl" title="Crear asesoria" 
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
    <b-row>
      <b-col>
        <TableAsesoria
          emptyText="No hay materias disponibles para seleccionar"
          @validar="handlerValidation"
          :asesorias="academicNotEnrolled" 
        />
      </b-col>
      <b-col>
        {{ academicEnrolled }}
      </b-col>
    </b-row>
  </b-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { usePensumStore } from '@/stores/usePensum';

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";

// @ts-ignore
import List from "../components/Pensum/List.vue";
// @ts-ignore
import Leyenda from "../components/Pensum/Leyenda.vue";
import TableAsesoria from "../components/Asesoria/Table.vue";

import { storeToRefs } from "pinia";

const open = ref<boolean>(false);
const store = usePensumStore();

const { pensumList, loading, carrera, activeAdvice, academicNotEnrolled, academicEnrolled } =  storeToRefs(store);

onMounted(() => {
  store.fetchPensum();
});

const handlerValidation = (item: any) => {
  store.pushAcademicLoad(item);
};

const goToEnrolled = () => {
  open.value = true;
};
</script>

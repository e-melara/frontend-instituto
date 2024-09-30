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
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { usePensumStore } from '@/stores/usePensum';

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";

// @ts-ignore
import List from "../components/Pensum/List.vue";
// @ts-ignore
import Leyenda from "../components/Pensum/Leyenda.vue";

import { storeToRefs } from "pinia";

const router = useRouter();
const store = usePensumStore();

const { pensumList, loading, carrera, activeAdvice, academicLoads } =  storeToRefs(store);

onMounted(() => {
  store.fetchPensum();
});

const goToEnrolled = () => {
  router.push({
    name: "pensum-asesoria",
  });
};
</script>

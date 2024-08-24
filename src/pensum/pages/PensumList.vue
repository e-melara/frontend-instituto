<template>
  <BreadCumbs title="Pensum" :button="true" />
  <div class="card" v-if="!loading">
<!--    <div class="card-header">-->
<!--      <div>-->
<!--        <div class="header-top">-->
<!--          <h5 class="m-0">Materias</h5>-->
<!--          <div class="" style="float: right" v-if="viewBtnAsesoria">-->
<!--            <b-dropdown id="dropdown-1" text="Asesoria" class="m-md-2" v-if="!viewAsesoriaBtn">-->
<!--              <b-dropdown-item @click="clickDescargarFileExcel">-->
<!--                Descargar horarios-->
<!--              </b-dropdown-item>-->
<!--              <b-dropdown-item @click="goToAsesoria">-->
<!--                {{ studentEnrolled ? "Ver asesoria" : "Iniciar asesoria" }}-->
<!--              </b-dropdown-item>-->
<!--            </b-dropdown>-->
<!--            <b-button v-else @click="goToViewAsesoria">Ver asesoria</b-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="card-body">
      <Leyenda :carrera="carrera" />
      <List :items="pensumList" />
    </div>
  </div>
  <div v-else>
    <b-spinner label="Cargando..." />
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";

import { usePensumStore } from '@/stores/usePensum';

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";

// @ts-ignore
import List from "../components/Pensum/List.vue";
// @ts-ignore
import Leyenda from "../components/Pensum/Leyenda.vue";

import { excelExportFile } from "@/exportacion";
import { storeToRefs } from "pinia";

const store = usePensumStore();
const router = useRouter();

const { pensumList, loading, carrera } =  storeToRefs(store);

onMounted(() => {
  store.fetchPensum();
});

// const { list, inscribir, studentEnrolled, viewBtnAsesoria, carrera, viewAsesoriaBtn } = toRefs(pensum);
//
// const clickDescargarFileExcel = () => {
//   excelExportFile(inscribir.value);
// };
//
// const goToAsesoria = () => {
//   router.push({
//     name: "pensum-asesoria",
//   });
// };
//
// const goToViewAsesoria = () => {
//   router.push({
//     name: 'pensum-view'
//   })
// }
</script>

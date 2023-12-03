<template>
  <BreadCumbs title="Pensum" :button="true" />
  <div class="card">
    <div class="card-header">
      <div>
        <div class="header-top">
          <h5 class="m-0">Materias</h5>
          <div class="" style="float: right" v-if="viewBtnAsesoria">
            <b-dropdown id="dropdown-1" text="Asesoria" class="m-md-2">
              <b-dropdown-item @click="clickDescargarFileExcel">
                Descargar horarios
              </b-dropdown-item>
              <b-dropdown-item @click="goToAsesoria">
                {{ studentEnrolled ? "Ver asesoria" : "Iniciar asesoria" }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <Leyenda />
      <List :keys="list.keys" :items="list.items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useRouter } from "vue-router";

import { usePensum } from "@/pensum/composables/usePensum";

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";

// @ts-ignore
import List from "../components/Pensum/List.vue";
// @ts-ignore
import Leyenda from "../components/Pensum/Leyenda.vue";

import { excelExportFile } from "@/exportacion";

const pensum = usePensum();
const router = useRouter();
const { list, inscribir, studentEnrolled, viewBtnAsesoria } = toRefs(pensum);

const clickDescargarFileExcel = () => {
  excelExportFile(inscribir.value);
};

const goToAsesoria = () => {
  router.push({
    name: "pensum-asesoria",
  });
};
</script>

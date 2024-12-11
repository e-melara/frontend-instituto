<template>
  <BreadCumbs title="Pensum" :button="true" />
  <div class="card" v-if="!loading">
    <div class="card-header">
      <div>
        <div class="header-top">
          <h5 class="m-0">Materias</h5>
          <div class="" style="float: right" v-if="getTextoAsesoriaText">
            <b-button @click="goToEnrolled">{{ getTextoAsesoriaText }}</b-button>
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
  <b-modal v-model="open" size="xxl" :title="utilAsesoriaBtnModalTitle ? 'CREAR ASESORIA' : 'VER ASESORIA'"
      :no-close-on-backdrop="true" :ok-disabled="!utilAsesoriaBtnModalTitle"
      :no-close-on-esc="true" @ok="handlerSubmit" ok-title="CREAR INSCRIPCIÓN" cancel-title="Cerrar"
    >
    <b-row v-if="utilAsesoriaBtnModalTitle">
      <b-col>
        <TableAsesoria
          emptyText="No hay materias disponibles para seleccionar"
          @validar="handlerValidation"
          :asesorias="academicNotEnrolled"
          :type="TypeTable.ENROLLED_PUSH"
        />
      </b-col>
      <b-col>
        <TableAsesoria
          emptyText="Debe seleccionar por lo menos una materia para poder continuar"
          @delete="handlerDeleteSubject"
          :asesorias="academicEnrolled"
          :type="TypeTable.ENROLLED_DELETE"
        />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <TableAsesoria
            :asesorias="activeAdvice.enrolled"
            :type="TypeTable.ENROLLED_SHOW"
        />
        <b-alert variant="success" show>
          {{
            activeAdvice.estado === 7
              ? "¡Proceso realizado con éxito¡, La inscripción se completará después de ser validado por Administración Académica y Unidad Financiera"
              : "La asesoría ha sido validada por Administración Académica y remitida a la Unidad Financiera para su respectiva revisión."
          }}
        </b-alert>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { usePensumStore } from '@/stores/usePensum';
import { TypeTable } from '@/pensum/interfaces'

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

const { pensumList, loading, utilAsesoriaBtnModalTitle, carrera, academicNotEnrolled, academicEnrolled, getTextoAsesoriaText, activeAdvice } =  storeToRefs(store);

onMounted(() => {
  store.fetchPensum();
});

const handlerValidation = (item: any) => {
  store.pushAcademicLoad(item);
};

const handlerDeleteSubject = (item: any) => {
  store.deleteAcademicLoad(item);
}

const goToEnrolled = () => {
  open.value = true;
};

const handlerSubmit = () => {
  store.submitEnrolledSubject();
}
</script>

<template>
  <b-table
    :fields="headers"
    :items="pensum.asesoria_detalle"
    class="b-table asesoria"
    bordered
    caption-top
  >
    <template #table-caption>
      <div class="d-flex">
        <div class="flex-grow-1 ms-3">
          <p>
            <h4>{{ pensum.student?.nombres }} {{ pensum.student?.apellidos }}</h4>
            Carnet: {{ pensum.student?.carnet }} <br />           
            <p>carrera: pensum: {{ pensum.carrera.nombre }}</p>
          </p>
          <strong>Materias solicitadas</strong>
        </div>
      </div>
    </template>
    <template #cell(docente)="{item}">
    {{ item.docente_nombres }} {{ item.docente_apellidos }}
    </template>
  </b-table>
  <div class="row my-3">
    <div class="col-12 d-flex justify-content-between">
      <b-button
        variant="primary"
        @click="() => clickBtns('008')"
        >Validar</b-button
      >
      <b-button
        variant="danger"
        @click="() => clickBtns('004')"
        >Denegar</b-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  pensum: any;
}

const headers = [
  { key: "materia_codigo", align: "center", label: "Codigo", sortable: false },
  { key: "materia_nombre", label: "Nombre de la materia", sortable: false },
  { key: "docente", label: "Nombrel docente", sortable: false },
];

// const util = useUtil();
const props = defineProps<Props>();
const { pensum } = toRefs(props);

const emits = defineEmits(["validar"]);

const clickBtns = (status: string) => {
  emits("validar", { status, id: props.pensum.aseroria.id });
};
</script>

<style scoped></style>

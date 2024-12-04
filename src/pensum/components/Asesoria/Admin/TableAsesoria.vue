<template>
  <b-table
    :fields="headers"
    :items="enrolled"
    class="b-table asesoria"
    caption-top
  >
    <template #table-caption>
      <div class="d-flex">
        <div class="flex-grow-1">
          <p>
            <h2 class="text-black">
              {{ student?.nombres }} {{ student?.apellidos }}
            </h2>
            <h4 class="text-black">Carnet: {{ student?.carnet }}</h4>
            <h5 class="text-black">Carrera: {{ carrera?.nombre }}</h5>
          </p>
        </div>
      </div>
    </template>
  </b-table>
  <div class="row my-3">
    <div class="col-12 d-flex justify-content-between">
      <b-button
        variant="primary" @click="() => clickBtns('008')">
        Validar
      </b-button>
      <b-button
        variant="danger" @click="() => clickBtns('004')">
        Denegar
      </b-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  enrolled: any[];
  student: any;
  carrera: any;
}

const headers = [
  { key: "subject_code", align: "center", label: "Codigo", sortable: false },
  { key: "subject_name", label: "Nombre de la materia", sortable: false },
  { key: "teacher_names", label: "Nombrel docente", sortable: false },
];

const props = defineProps<Props>();

const { pensum, student, carrera } = toRefs(props);

const emits = defineEmits(["validar"]);

const clickBtns = (status: string) => {
  emits("validar", status );
};
</script>

<style scoped></style>

<template>
  <div class="card">
    <div class="card-header">
      <h5>Horarios</h5>
    </div>
    <div class="table-responsive mb-0">
      <table class="table b-table asesoria">
        <thead role="rowgroup">
          <tr role="row">
            <th
              class="text-center"
              role="columnheader"
              width="40px"
              scope="col"
            ></th>
            <th
              class="text-center"
              role="columnheader"
              width="60px"
              scope="col"
            >
              Codigo
            </th>
            <th class="text-center" role="columnheader" scope="col">
              Nombre de la materia
            </th>
            <th
              class="text-center"
              role="columnheader"
              width="60px"
              scope="col"
            >
              Dias
            </th>
            <th
              class="text-center"
              role="columnheader"
              width="190px"
              scope="col"
            >
              Hora
            </th>
            <th
              class="text-center"
              role="columnheader"
              width="60px"
              scope="col"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(subject, index) in subjects" :key="subject.codmate">
            <td>{{ index + 1 }}</td>
            <td>{{ subject.codmate }}</td>
            <td>{{ subject.nommate }}</td>
            <td>{{ subject.item.dias }}</td>
            <td>{{ subject.item.horas }}</td>
            <td>
              <button
              v-if="hasRol"
                class="btn btn-secondary"
                @click="clickRemoveItem(subject.codmate)"
              >
                x
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer" style="padding: 20px 15px">
      <button
        @click="sendBtnClicked"
        class="btn btn-primary active pull-right d-flex"
        v-if="subjects.length > 0 && hasRol"
      >
        <vue-feather type="send"></vue-feather>
      </button>
      <div class="alert alert-danger" v-else>
        <h6 class="text-center">Debes seleccionar por lo menos una materia</h6>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { Subjects } from "../../interfaces";

interface Props {
  subjects: Subjects[];
  hasRol: boolean
}
const props = defineProps<Props>();
const { subjects, hasRol } = toRefs(props);

const emits = defineEmits(["remove", "send"]);

const clickRemoveItem = (codmate: string) => {
  emits("remove", codmate);
};

const sendBtnClicked = () => {
  emits("send");
};
</script>

<style lang="scss" scoped></style>

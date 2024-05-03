<script setup lang="ts">
import { computed, toRefs } from "vue";

const mapEstados = new Map([
  ['007', "Se ha enviado la asesoria al proceso de validacion"],
  ['008', "Se ha enviado la asesoria a la validacion de pago"],
  ['009', "La asesoria has sido validad y sus materias estas inscriptas"],
]);

interface Props {
  items?: any[] | null;
  estado: any;
}

const props = defineProps<Props>();
const { items } = toRefs(props);

// actions
const getEstadoAsesoria = computed(() => {
  return mapEstados.get(props.estado.codigo);
});
</script>

<template>
  <div class="card">
    <div class="card-header p-4">
      <h5>Materias solicitadas</h5>
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
            <th class="text-left" role="columnheader" scope="col">
              Nombre de la materia
            </th>
            <th
              role="columnheader"
              scope="col"
            >
              Docente
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.codcarga">
            <td>{{ index + 1 }}</td>
            <td>{{ item.materia_codigo }}</td>
            <td>{{ item.materia_nombre}}</td>
            <td>{{ item.docente_nombres }} {{ item.docente_apellidos }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer" style="padding: 20px 15px">
      <div class="alert alert-success">
        <h6 class="text-center">{{ getEstadoAsesoria }}</h6>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

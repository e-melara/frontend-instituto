<script setup lang="ts">
import { toRefs } from "vue";
import type { Inscribir } from "@/pensum/interfaces";

// enum('I')
// .A Cuando se ha enviado la asesoria para colecturia
// .V para cuando ha sido enviada a pagaduria
// P cuando estan las materias aun pendiente de aceptar
// D para la asesoria denegada
// F la persona ha enviada la asesoria pero por medio de archivos
// .M La materias han sido inscriptas
const messageAsesoria = {
  A: "Se ha enviado la asesoria al proceso de validacion",
  //M: "La asesoria ha sido matriculada con exito",
  V: "Su asesoria ha sido validada, puede realizar el pago en ventanilla",
  P: "Por el momento la asesoria tiene observaciones, estar pendiente por favor",
  M: "La asesoria has sido validad y sus materias estas inscriptas",
  "Validacion de pago":
    "Su pago esta en proceso de validacion, de 3 a 4 dias habiles se aplicara su inscripcion de materias",
};

const mapsAlert = new Map();
Object.entries(messageAsesoria).forEach(([key, value]) => {
  mapsAlert.set(key, value);
});

interface Props {
  status: string | undefined;
  items?: Inscribir[] | null;
}

const props = defineProps<Props>();
const { items, status } = toRefs(props);

const showAlertSpan = (status: string | undefined) => {
  if (status !== undefined) {
    if (mapsAlert.has(status)) {
      return mapsAlert.get(status);
    }
  }
  return mapsAlert.get("A");
};
</script>

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
            <th class="text-left" role="columnheader" scope="col">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.codcarga">
            <td>{{ index + 1 }}</td>
            <td>{{ item.materia.codmate }}</td>
            <td>{{ item.materia.nommate }}</td>
            <td>{{ item.dias }}</td>
            <td>{{ item.hora }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer" style="padding: 20px 15px">
      <div class="alert alert-success">
        <h6 class="text-center">{{ showAlertSpan(props.status) }}</h6>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<template>
  <div class="card">
    <div class="card-header">
      <h5>Materias</h5>
      <span>
        Listado de materias que se pueden seleccionar para el actual ciclo.
        <strong>
          Nota: Solo se pueden seleccionar 5 materias como maximo y los horarios
          deben ser diferente
        </strong>
      </span>
    </div>
    <div class="table-responsive mb-0">
      <table
        class="table b-table asesoria"
        role="table"
        v-for="item in asesorias"
        :key="item.codmate"
      >
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader" width="150px" scope="col">
              {{ item.codmate }}
            </th>
            <th role="columnheader" scope="col">
              {{ item.nommate }}
            </th>
            <th width="130px">
              <span class="badge badge-light-success pull-right"
                >{{ item.horarios?.length }} Horarios disponibles</span
              >
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horario in item.horarios" :key="horario.id">
            <td>DIA: {{ horario.dias }}</td>
            <td>Horas: {{ horario.horas }}</td>
            <td>
              <button
              v-if="hasRol"
                type="button"
                class="pull-right btn btn-pill btn-success active"
                @click="handlerSelection(horario, item)"
              >
                Seleccionar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { IHorarioAsesoria, IMateria } from "@/pensum/interfaces";

interface Props {
  asesorias: IMateria[];
  hasRol: boolean
}

const emits = defineEmits(["validar"]);

const props = defineProps<Props>();
const { asesorias, hasRol } = toRefs(props);

const handlerSelection = (
  item: IHorarioAsesoria,
  groupSelecction: IMateria
) => {
  emits("validar", { item, codmate: groupSelecction.codmate, nommate: groupSelecction.nommate });
};
</script>

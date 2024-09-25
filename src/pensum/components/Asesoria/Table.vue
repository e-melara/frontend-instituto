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
      >
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader" width="150px" scope="col">
             Codigo de la materia
            </th>
            <th role="columnheader" scope="col">
              Nombre de la materia
            </th>
            <th role="columnheader" scope="col">
              Nombre del docente
            </th>
            <th role="columnheader" scope="col"></th>
          </tr>
        </thead>
        <tbody v-for="item in asesorias" :key="item.id">
          <tr role="row">
            <th role="columnheader" width="150px" scope="col">
              
            </th>
            <th role="columnheader" scope="col">
            </th>
            <th role="columnheader" scope="col">
            </th>
            <th>
              <button
              v-if="hasRol"
                type="button"
                class="pull-right btn btn-pill btn-success active" @click="handlerSelection(item)">
                Seleccionar
              </button>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr v-if="asesorias.length === 0">
            <td colspan="4" class="text-center">
              No hay materias para mostrar
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { IHorarioAsesoria, IMateria, CargasAcademica } from "@/pensum/interfaces";

interface Props {
  asesorias: CargasAcademica[];
  hasRol: boolean
}

const emits = defineEmits(["validar"]);

const props = defineProps<Props>();
const { asesorias, hasRol } = toRefs(props);

const handlerSelection = (
  item: CargasAcademica
) => {
  emits("validar", { item });
};
</script>

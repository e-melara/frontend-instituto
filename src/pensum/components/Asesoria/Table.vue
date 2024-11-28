<template>
  <div class="card">
    <div class="card-header" style="padding: 0 0 30px 0 !important;">
      <b-alert show :variant="type === TypeTable.ENROLLED_PUSH ? 'primary' : 'success'">
        <h4 class="alert-heading">Materias</h4>
        <p v-if="type == TypeTable.ENROLLED_PUSH">
          Listado de materias disponibles para selección en el ciclo actual.
          <strong>
            Nota: Los estudiantes pueden seleccionar un máximo de 5 materias. Asegúrate de que los horarios no se superpongan entre sí.
          </strong>
        </p>
        <p v-else>
          Materias seleccionadas para la asesoria
        </p>
      </b-alert>
    </div>
    <div class="table-responsive mb-0">
      <b-table
        show-empty
        striped hover :items="asesorias" :fields="fields"
      >
        <template #cell(teacher_names)="{item}">
          {{ item?.teacher_names?.toUpperCase() }}, {{ item?.teacher_lasts?.toUpperCase() }}
        </template>
        <template #cell(actions)="{item}">
          <b-button size="sm" @click="handlerSelection(item)">
            <vue-feather :type="props.type == TypeTable.ENROLLED_PUSH ? 'check-circle' : 'trash'" />
          </b-button>
        </template>
        <template #empty="scope">
          <h4 class="text-center">{{ emptyText || 'No hay datos que mostrar' }}</h4>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref } from "vue";
import { TypeTable } from '@/pensum/interfaces'

const fields = ref([
  { key: "subject_code", label: "Codigo de la materia", class: "text-uppercase" },
  { key: "subject_name", label: "Nombre de la materia", class: "text-uppercase" },
  { key: "teacher_names", label: "Nombre del docente", class: "text-uppercase" },
  { key: "actions", label: "" },
]);

interface Props {
  asesorias: any[];
  emptyText?: string;
  type: {
    type: string,
    default: TypeTable.ENROLLED_PUSH
  }
}

const emits = defineEmits(["validar", "delete"]);
const props = defineProps<Props>();
const { asesorias } = toRefs(props);

const handlerSelection = (item: any) => {
  if(props.type === TypeTable.ENROLLED_PUSH) {
    emits("validar", item);
  } else {
    emits("delete", item);
  }
};
</script>

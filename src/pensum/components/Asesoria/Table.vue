<template>
  <div class="card">
    <div class="card-header" style="padding: 0 0 30px 0 !important;">
      <b-alert show variant="secondary">
        <h4 class="alert-heading">Materias</h4>
        <p>
          Listado de materias disponibles para selección en el ciclo actual.
          <strong>
            Nota: Los estudiantes pueden seleccionar un máximo de 5 materias. Asegúrate de que los horarios no se superpongan entre sí.
          </strong>
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
            <vue-feather type="check-circle" />
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

const fields = ref([
  { key: "subject_code", label: "Codigo de la materia", class: "text-uppercase" },
  { key: "subject_name", label: "Nombre de la materia", class: "text-uppercase" },
  { key: "teacher_names", label: "Nombre del docente", class: "text-uppercase" },
  { key: "actions", label: "" },
]);

interface Props {
  asesorias: any[];
  emptyText?: string;
  // hasRol: boolean
}

const emits = defineEmits(["validar"]);

const props = defineProps<Props>();
const { asesorias } = toRefs(props);

const handlerSelection = (item: any) => {
  emits("validar", item);
};
</script>

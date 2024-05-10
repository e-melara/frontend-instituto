<template>
  <div class="table-responsive">
    <table class="table-note table" v-if="show">
      <thead v-html="stringTableHeader" />
      <tbody>
        <tr v-for="(student, key) in listStudents" :key="key">
          <td v-for="(position, index) in student" :key="index">
            {{ index > 2 ? filterNumeric(position) : position }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>Tenemos un problema al mostrar la notas, consulta al administrador del sistema</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { concat, filter, startsWith, chunk } from 'lodash'
import { ref, toRefs, watchEffect, watch } from 'vue';

import { filterNumeric } from '@/utils/functions';
import { stringTableFn } from '@/utils/tablesStringNotes';

const show = ref(false);
const listStudents = ref<any>([]);
const numberOfColumns = ref(0);
const stringTableHeader = ref<string>('');

const props = defineProps({
  config: {
    type: Number,
    default: 0,
    required: true
  },
  alumnos: {
    type: Array,
    default: () => []
  }
})

const { config, alumnos } = toRefs(props);

const configWatcher = async () => {
  try {
    show.value = true;
    const stringTable = await stringTableFn(config.value);
    stringTableHeader.value = stringTable.template;
    numberOfColumns.value = stringTable.number_of_columns;
  } catch (error) {
    show.value = false;
  }
}

watch(config, async (value) => {
  await configWatcher();
});

watch(alumnos, async (value) => {
  listStudentsFn();
});

const listStudentsFn = () => {
  listStudents.value = alumnos.value.map((student: any, index) => {
    const { alumno } = student;
    const arrayStudentInfo = [ (index + 1), alumno.carnet, `${alumno.apellidos} ${alumno.nombres}` ]
    const $arrayNotes = chunk(filter(student, (value, key) => {
      return startsWith(key, 'nota_')
    }), numberOfColumns.value)[0]
    return concat(arrayStudentInfo, $arrayNotes)
  }, [listStudents.value]);
}

watchEffect(async () => {
  await configWatcher();
  listStudentsFn();  
});
</script>

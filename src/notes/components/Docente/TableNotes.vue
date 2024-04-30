<template>
  <table-note-one>
    <tr>
      <td colspan="12">TEORIA</td>
      <td rowspan="3">NOTA FINAL</td>
      <td rowspan="3">EXAMEN DE REPO</td>
      <td rowspan="3">NOTA DEL CICLO</td>
    </tr>
  </table-note-one>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

// @ts-ignore
import TableNoteOne from '../../components/Notes/TableNoteOne'

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

</script>

<style scoped>
h1 {
  color: blue;
}
</style>
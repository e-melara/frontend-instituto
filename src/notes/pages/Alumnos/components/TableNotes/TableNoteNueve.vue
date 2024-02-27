<template>
  <table class="table-note table">
    <thead>
      <tr>
        <td colspan="12">TEORIA</td>
        <td rowspan="3">NOTA FINAL TEORIA</td>
        <td rowspan="3">EXAMEN DE REPOSICION</td>
        <td rowspan="3">NOTA FINAL TEORIA</td>
        <td rowspan="3">NOTA FINAL TEORIA 40%</td>
        <td colspan="8">PRACTICA</td>
        <td rowspan="3">NOTA FINAL CICLO (TEORIA + PRACTICA)</td>
        <td rowspan="3">EXAMEN DE REPOSICION</td>
        <td rowspan="3">NOTA DEL CICLO</td>
      </tr>
      <tr>
        <td colspan="4">EXAMENES PARCIALES</td>
        <td colspan="2">TRABAJO DE CAMPO</td>
        <td colspan="4">LABORATORIOS PRACTICOS</td>
        <td rowspan="2">EXAMEN FINAL</td>
        <td rowspan="2">EXAMEN FINAL 10%</td>
        <td rowspan="2">P</td>
        <td rowspan="2">15%</td>
        <td rowspan="2">CV</td>
        <td rowspan="2">15%</td>
        <td rowspan="2">PT</td>
        <td rowspan="2">30%</td>
        <td rowspan="2">NOTA FINAL PRACTICA</td>
        <td rowspan="2">PRACTICA 60%</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>15%</td>
        <td>1</td>
        <td>10%</td>
        <td>LAB. 1</td>
        <td>LAB. 2</td>
        <td>LAB. 3</td>
        <td>TOTAL 5%</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ filterNumeric(materia.nota_1) }}</td>
        <td>{{ filterNumeric(materia.nota_2) }}</td>
        <td>{{ filterNumeric(materia.nota_3) }}</td>
        <td>{{ filterNumeric(materia.nota_4) }}</td>
        <td>{{ filterNumeric(materia.nota_5) }}</td>
        <td>{{ filterNumeric(materia.nota_6) }}</td>
        <td>{{ filterNumeric(materia.nota_7) }}</td>
        <td>{{ filterNumeric(materia.nota_8) }}</td>
        <td>{{ filterNumeric(materia.nota_9) }}</td>
        <td>{{ filterNumeric(materia.nota_10) }}</td>
        <td>{{ filterNumeric(materia.nota_11) }}</td>
        <td>{{ filterNumeric(materia.nota_12) }}</td>
        <td>{{ filterNumeric(materia.nota_13) }}</td>
        <td>{{ filterNumeric(materia.nota_14) }}</td>
        <td>{{ filterNumeric(materia.promedio) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useNoteStore } from '@/stores';

export default {
  name: 'TableNoteOne',
  setup() {
    const materia = ref<any>(null);
    const store = useNoteStore();
    const { viewNoteTable } = storeToRefs(store);

    materia.value = viewNoteTable.value.materia;

    const filterNumeric = (value: string | number) => {
      console.log(value);
      return parseFloat(value.toString()).toFixed(2);
    };

    return {
      materia,
      filterNumeric,
    };
  },
};
</script>



<style scoped>
</style>

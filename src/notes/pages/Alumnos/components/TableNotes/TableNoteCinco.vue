<template>
  <table class="table-note table">
    <thead>
      <tr>
			<td colspan="16">TEORIA (T)</td>
			<td colspan="18">PRACTICA (P)</td>
			<td rowspan="3">NFC (T + P)</td>
			<td rowspan="3">EXAMEN DE REPOSICION</td>
			<td rowspan="3">NOTA DEL CICLO</td>
		</tr>
		<tr>
			<td colspan="4">EXAMENES PARCIALES</td>
			<td colspan="2">TRABAJO DE CAMPO</td>
			<td colspan="4">LABORATORIOS</td>
			<td colspan="2">EXAMEN FINAL</td>
			<td rowspan="2">NOTA FINAL TEORIA</td>
			<td rowspan="2">EXAMEN DE REPO</td>
			<td rowspan="2">NOTA FINAL TEORIA</td>
			<td rowspan="2">NOTA FINAL TEORIA 40%</td>
			<td colspan="8">AREA DE MEDICINA</td>
			<td colspan="8">AREA DE CIRUGIA</td>
			<td rowspan="2">NOTA FINAL PRACTICA</td>
			<td rowspan="2">PRACTICA 60%</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
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

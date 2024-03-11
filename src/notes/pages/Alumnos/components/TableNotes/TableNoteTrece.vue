<template>
  <table class="table-note table">
    <thead>
			<tr>
				<td colspan="16">TEORIA</td>
				<td colspan="26">PRACTICAS</td>
				<td rowspan="3">NOTA FINAL (TEORIA + PRACTICA)</td>
				<td rowspan="3">EXAMEN DE REPO</td>
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
				<td colspan="8">PARTO  20%</td>
				<td colspan="8">PUERPERIO  20%</td>
				<td colspan="8">PEDIATRIA  20%</td>
				<td rowspan="2">NOTA FINAL PRACTICA</td>
				<td rowspan="2">60%</td>
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
				<td>1</td>
				<td>10%</td>
				<td>P</td>
				<td>15%</td>
				<td>CV</td>
				<td>5%</td>
				<td>PT</td>
				<td>10%</td>
				<td>NOTA</td>
				<td>TOTAL 20%</td>
				<td>P</td>
				<td>15%</td>
				<td>CV</td>
				<td>5%</td>
				<td>PT</td>
				<td>10%</td>
				<td>NOTA</td>
				<td>TOTAL 20%</td>
				<td>P</td>
				<td>15%</td>
				<td>CV</td>
				<td>5%</td>
				<td>PT</td>
				<td>10%</td>
				<td>NOTA</td>
				<td>TOTAL 20%</td>
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
        <td>{{ filterNumeric(materia.nota_15) }}</td>
				<td>{{ filterNumeric(materia.nota_16) }}</td>
				<td>{{ filterNumeric(materia.nota_17) }}</td>
				<td>{{ filterNumeric(materia.nota_18) }}</td>
				<td>{{ filterNumeric(materia.nota_19) }}</td>
				<td>{{ filterNumeric(materia.nota_20) }}</td>
				<td>{{ filterNumeric(materia.nota_21) }}</td>
				<td>{{ filterNumeric(materia.nota_22) }}</td>
				<td>{{ filterNumeric(materia.nota_23) }}</td>
				<td>{{ filterNumeric(materia.nota_24) }}</td>
				<td>{{ filterNumeric(materia.nota_25) }}</td>
				<td>{{ filterNumeric(materia.nota_26) }}</td>
				<td>{{ filterNumeric(materia.nota_27) }}</td>
				<td>{{ filterNumeric(materia.nota_28) }}</td>
				<td>{{ filterNumeric(materia.nota_29) }}</td>
				<td>{{ filterNumeric(materia.nota_30) }}</td>
				<td>{{ filterNumeric(materia.nota_31) }}</td>
				<td>{{ filterNumeric(materia.nota_32) }}</td>
				<td>{{ filterNumeric(materia.nota_33) }}</td>
				<td>{{ filterNumeric(materia.nota_34) }}</td>
				<td>{{ filterNumeric(materia.nota_35) }}</td>
				<td>{{ filterNumeric(materia.nota_36) }}</td>
				<td>{{ filterNumeric(materia.nota_37) }}</td>
				<td>{{ filterNumeric(materia.nota_38) }}</td>
				<td>{{ filterNumeric(materia.nota_39) }}</td>
				<td>{{ filterNumeric(materia.nota_40) }}</td>
				<td>{{ filterNumeric(materia.nota_41) }}</td>
				<td>{{ filterNumeric(materia.nota_42) }}</td>
				<td>{{ filterNumeric(materia.nota_43) }}</td>
				<td>{{ filterNumeric(materia.nota_44) }}</td>
				<td>{{ filterNumeric(materia.nota_45) }}</td>
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

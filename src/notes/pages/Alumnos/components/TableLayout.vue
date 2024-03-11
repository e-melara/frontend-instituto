<template>
  <div class="container-fluid">
    <component :is="element" />
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, ref, watch } from 'vue';
import { useNoteStore } from "@/stores";

// importando los componentes con las tablas
import TableNoteOne from './TableNotes/TableNoteOne.vue';
import TableNoteOcho from './TableNotes/TableNoteOcho.vue';
import TableNoteTwo from './TableNotes/TableNoteTwo.vue';
import TableNoteThree from './TableNotes/TableNoteThree.vue';
import TableNoteFour from './TableNotes/TableNoteFour.vue';
import TableNoteDiez from './TableNotes/TableNoteDiez.vue';
import TableNoteOnce from './TableNotes/TableNoteOnce.vue';
import TableNoteNueve from './TableNotes/TableNoteNueve.vue';
import TableNoteCinco from './TableNotes/TableNoteCinco.vue';
import TableNoteSeis from './TableNotes/TableNoteSeis.vue';
import TableNoteSiete from './TableNotes/TableNoteSiete.vue';
import TableNoteDoce from './TableNotes/TableNoteDoce.vue';
import TableNoteTrece from './TableNotes/TableNoteTrece.vue';
import TableNoteCatorce from './TableNotes/TableNoteCatorce.vue';
import TableNoteQuince from './TableNotes/TableNoteQuince.vue';

const components = [
  TableNoteOne, // 1
  TableNoteTwo, // 2
  TableNoteThree, // 3
  TableNoteFour, // 4
  TableNoteCinco, // 5
  TableNoteSeis, // 6
  TableNoteSiete, // 7
  TableNoteOcho, // 8
  TableNoteNueve, // 9
  TableNoteDiez, // 10
  TableNoteOnce, // 11
  TableNoteDoce, // 12
  TableNoteTrece, // 13
  TableNoteCatorce, // 14
  TableNoteQuince, // 15
];

export default defineComponent({
  name: 'TableLayout',
  setup() {
    const store = useNoteStore();
    const element = ref<any>(null);
    const { viewNoteTable } = storeToRefs(store);

    watch(viewNoteTable, ({ nota }) => {
      const { id_config_nota } = nota as any;
      element.value = components[id_config_nota - 1];
    });

    return {
      element
    };
  },
});

</script>


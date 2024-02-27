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
import TableNoteDiez from './TableNotes/TableNoteDiez.vue';
import TableNoteOnce from './TableNotes/TableNoteOnce.vue';
import TableNoteNueve from './TableNotes/TableNoteNueve.vue';
import TableNoteCinco from './TableNotes/TableNoteCinco.vue';

const components = [
  TableNoteOne, // 1
  TableNoteTwo, // 2
  TableNoteCinco, // 5
  TableNoteOcho, // 8
  TableNoteNueve, // 9
  TableNoteDiez, // 10
  TableNoteOnce, // 11
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


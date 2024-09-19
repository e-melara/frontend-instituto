<template>
    <BreadCumbs title="Historial de notas" :button="true" />
  
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <Accordion>
            <AccordionTab v-for="tab in subjectsStudent" :key="tab.id" :header="getTitleTabs(tab)">
              <div class="table-responsive">
                <table-notes :config="tab.id_porcentaje_nota" :alumnos="[tab]" />
              </div>
            </AccordionTab>
          </Accordion>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script lang="ts" setup>
  import { storeToRefs } from "pinia";
  import { onMounted, ref } from "vue";
  
  import Accordion from 'primevue/accordion';
  import AccordionTab from 'primevue/accordiontab';
  
  // // @ts-ignore
  import TableNotes from '../../components/Notes/TableNote.vue';
  import BreadCumbs from "@/shared/BreadCumbs.vue";
  
  import { useNoteStore } from "@/stores";
  import { string } from "zod";
  
  const store = useNoteStore();
  const { subjectsStudent } = storeToRefs(store);
  
  const titleModal = ref("");
  const open = ref<boolean>(false);
  
  // actions 
  const viewNoteStudent = async (row: object) => {
    await store.getNotaViewId((row as any).id);
    titleModal.value = (row as any).materia;
    open.value = true;
  };
  
  const getTitleTabs = (tab:any) => {
    const { codigo, nombre, docente } = tab
    let stringTab = `${codigo} - ${nombre}`;
    if(docente) {
      stringTab += ` - ${docente.nombres} ${docente.apellidos}`;
    }
    return stringTab;
  }
  
  onMounted(() => store.getNotasEstudiante(1));
  </script>
  
  <style>
  .table {
    font-size: 0.8rem;
    border: 1px solid black !important;
  }
  .header-table th {
    background-color: #2f3c4e !important;
    font-weight: bold !important;
    font-size: 0.95rem !important;
    color: white !important;
  }
  .modal-98 .modal-dialog {
    max-width: 98% !important;
  }
  </style>
  
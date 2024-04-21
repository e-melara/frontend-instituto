<template>
  <b-modal
    id="modal-1"
    title="Notas"
    v-model="show"
    @hide="onCloseModal"
    size="xl"
    hide-footer
    scrollable
    :no-close-on-esc="true"
    :no-close-on-backdrop="true"
  >
    <b-container fluid>
      <b-row>
        <b-col cols="4">
          <b-row>
            <b-form-group id="nota-group" label="Evaluacion:" label-for="nota-input">
              <b-form-select
                v-model="note"
                required
                :options="keys"
                id="nota-input"
              />
            </b-form-group>
            <b-form-group id="nota-group" label="Nota: " label-for="nota-input-children" v-if="keysChildren.length > 0">
              <b-form-select
                v-model="noteChildren"
                required
                :options="keysChildren"
                id="nota-input-children"
              />
            </b-form-group>
          </b-row>
          <b-row>
            <b-col class="mt-3">
              <div v-if="state.files.length > 0" class="files">
                <div
                  class="file-item"
                  v-for="(file, index) in state.files"
                  :key="index"
                >
                  <span>{{ file.name }}</span>
                  <span class="delete-file" @click="handlerDeleteFile"
                    >Eliminar</span
                  >
                </div>
              </div>
              <div v-else v-bind="getRootProps()" class="dropzone">
                <div class="border" :class="{ isDragActive }">
                  <input v-bind="getInputProps()" />
                  <p v-if="isDragActive">Suelta el archivo aquí ....</p>
                  <p v-else class="text-center">
                    Arrastre y suelte archivos aquí, o haga clic para
                    seleccionar archivos
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-button
            class="mt-4"
            :disabled="!valid"
            @click="handleSubmit"
            variant="primary"
            >Ver</b-button
          >
        </b-col>
        <b-col class="d-flex justify-content-center align-items-center">
          <h2 v-if="arrayNote.length === 0" class="text-center">
            Debes seleccionar un archivo valido.
          </h2>
          <b-table
            v-else
            :items="arrayNote"
            bordered
            hover
            small
            :fields="header"
          >
            <template #cell(nota)="{ item }">
              <span class="d-block text-center badge" :class="item.color">
                {{ item.valor.toFixed(2) }}
              </span>
            </template>
            <template #cell(#)="{ index }">
              {{ index + 1 }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>

    <div class="d-flex justify-content-end mt-4" v-if="validNote">
      <b-button variant="primary" @click="sendNote">Subir notas</b-button>
    </div>
  </b-modal>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useDropzone } from "vue3-dropzone";
import { computed, reactive, toRefs, ref, onMounted, watch } from "vue";

import { useUtilsStore } from "@/stores";
import { readFile } from "@/exportacion/utils";
import type { ICarga } from "@/notes/interfaces";

interface Props {
  show: boolean;
  carga: ICarga;
  data: { notas: any, materia: any };
}

const header = ["#","carnet", "nombre", "nota"];

const route = useRoute();
const util = useUtilsStore();

const keys = ref<string[]>([]);
const keysChildren = ref<string[]>([]);
const note = ref<string | undefined>(undefined);
const noteChildren = ref<string | undefined>(undefined);

const arrayNote = ref<any[]>([]);
const validNote = ref<boolean>(false);

const state = reactive<{ files: any[] }>({
  files: [],
});
const props = defineProps<Props>();
const emits = defineEmits(["close", "send"]);

const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
  onDrop: function (acceptFiles) {
    state.files = acceptFiles;
  },
  accept: [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ],
});

const { show, carga } = toRefs(props);

watch(() => props.data.notas, (value) => {
  if(!value) return;
  keys.value = Object.keys(value);
}, { immediate: true });

watch(() => note.value, (value) => {
  if(value) {
    const noteKey: string = props.data.notas[value];
    noteChildren.value = undefined;
    if(typeof noteKey === 'object') {
      keysChildren.value = Object.keys(noteKey);
    } else {
      keysChildren.value = [];
    }
  }
});

// actions
const onCloseModal = () => {
  reset();
  emits("close");
};
const handlerDeleteFile = () => {
  arrayNote.value = []
  state.files.splice(0, 1);
};

const handleSubmit = (event: Event) => {
  event.preventDefault();

  if(keysChildren.value.length > 0 && noteChildren.value === undefined) {
    util.showAlert({
      detail: "Debes seleccionar una evaluacion",
      summary: "Error",
      severity: "error",
    });
    return;
  }
  

  if (valid) {
    const routeId = route.params.id;
    // @ts-ignore
    readFile(state.files, +routeId, carga.value.length)
      .then((array: any) => {
        arrayNote.value = array;
        validNote.value = true;
      })
      .catch((error) => {
        util.showAlert({
          detail: error,
          summary: "Error",
          severity: "error",
        });
        validNote.value = false;
      });
  }
};

// computed
const valid = computed(() => {
  if(keysChildren.value.length > 0 && noteChildren.value === undefined) {
    return false;
  }
  return state.files.length > 0 && note.value !== undefined;
});

const reset = () => {
  state.files = [];
  arrayNote.value = [];
  note.value = undefined;
  validNote.value = false;
  keysChildren.value = [];
  noteChildren.value = undefined;
};

const sendNote = () => {
  if(note.value) {
    let keyNote = props.data.notas[note.value];
    if(noteChildren.value) {
      keyNote = keyNote[noteChildren.value];
    }
    const params = {
      notes: arrayNote.value.map(({ carnet, valor }) => ({ carnet, valor })),
      idcarga: route.params.id,
      key_note: keyNote,
    }
    emits("send", params);
    reset();
  } else {
    util.showAlert({
      detail: "Debes seleccionar todas las evaluaciones y subir un archivo valido",
      summary: "Error",
      severity: "error",
    });
  }
};

onMounted(() => {
  reset();
});
</script>

<style scoped lang="scss">
.dropzone,
.files {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  font-size: 12px;
  line-height: 1.5;
}
.border {
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: all 0.3s ease;
  background: #fff;

  &.isDragActive {
    border: 2px dashed #ffb300;
    background: rgb(255 167 18 / 20%);
  }
}
.file-item {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(255 167 18 / 20%);
  padding: 7px;
  padding-left: 15px;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .delete-file {
    background: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>

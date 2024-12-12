<template>
  <div class="row">
    <div class="col-5 offset-7">
      <b-form-group
        label=""
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
      >
        <b-input-group>
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            @keyup.enter="handlerBtnSearch"
            placeholder="Buscar por carnet, nombre o apellido"
          ></b-form-input>

          <b-input-group-append>
            <b-button variant="primary" @click="handlerBtnSearch"
              >Buscar</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </div>
  </div>

  <b-table
    :fields="headers"
    show-empty
    ref="table"
    id="my-table"
    :items="results"
    responsive="sm"
    :busy.sync="isBuy"
  >
    <template #empty>
      <b-alert show variant="info"
        >Por el momento no tenemos registro para mostrar</b-alert
      >
    </template>
    <template #cell(id)="{ index }">
      {{ index + 1 }}
    </template>
    <template #cell(actions)="data">
      <b-button
        variant="primary"
        @click="handlerViewPensum(data)"
        v-if="props.estado === 7"
        >Ver pensum</b-button
      >
      <b-button variant="primary" v-else @click="handlerAprobar(data)">
        Arrancel pagado
      </b-button>
    </template>
  </b-table>
  <div class="row">
    <div class="col-12 mt-2">
      <b-pagination
        v-model="paginate.page"
        :total-rows="paginate.total"
        :per-page="paginate.per_page"
        aria-controls="my-table"
        @page-click="clickPage"
      ></b-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref, defineProps, defineExpose, defineEmits } from "vue";

import { useAsesoria } from "../../../stores";

const filter = ref("");
const headers = [
  { key: "id", label: "#" },
  { key: "carnet", label: "Carnet" },
  { key: "nombres", label: "Nombres y apellidos" },
  { key: "pensum", label: "Pensum" },
  { key: "carrera", label: "Carrera" },
  { key: "actions", label: "" },
];

interface Props {
  estado: number;
  per_page: number;
}

const props = defineProps<Props>();

const emits = defineEmits(["viewPensum", "aprobarAsesoria"]);

const store = useAsesoria();
const { paginate, results } = storeToRefs(store);
const isBuy = ref(false);

const clickPage = (event: any, page: number) => {
  event.preventDefault();
  paginateFn({ page });
};

const handlerBtnSearch = () => {
  paginateFn({ q: filter.value });
};

const handlerAprobar = ({ item }: any) => {
  const { id } = item;
  emits("aprobarAsesoria", id);
};

const handlerViewPensum = ({ item }: any) => {
  const { carnet, id } = item;
  emits("viewPensum", { carnet, id });
};

const paginateFn = async (params: any = {}) => {
  isBuy.value = true;
  const values = {
    q: params.q || "",
    page: params.page || 1,
    estado: params.estado || props.estado,
    per_page: params.per_page || props.per_page,
  };
  await store.getPaginate(values);
  isBuy.value = false;
};

const refresh = (params = {}) => {
  paginateFn(params);
};

defineExpose({
  refresh,
});

// onMounted
onMounted(() => {
  paginateFn();
});
</script>

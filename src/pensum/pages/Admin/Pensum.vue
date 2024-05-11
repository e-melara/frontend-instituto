<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";


// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import TableAsesoria from "../../components/Asesoria/TableAsesoria.vue";

const route = useRoute();

const routeNameParams = ()  => {  
  estado.value = route.name === 'pensum-asesor' ? '9' : '10';
  // @ts-ignore
  table.value?.refresh({ estado: estado.value });
}

watch(() => route.name, () => routeNameParams());

const table = ref(null);
const estado = ref<string | null>(null);

onMounted(() => {
  routeNameParams();
});

/* // @ts-ignore
import PensumList from "../../components/Asesoria/Admin/List.vue";
// @ts-ignore
import Search from "../../components/Asesoria/Admin/Search.vue";

// para el modal
// @ts-ignore
import TableAsesoria from "../../components/Asesoria/Admin/TableAsesoria.vue";
// @ts-ignore
import Pensum from "../../components/Pensum/List.vue";

import { storeToRefs } from "pinia";
import type { BvEvent } from "bootstrap-vue-3";
import { computed, onBeforeMount, ref, watch } from "vue";

import { usePensumStore } from "@/stores/usePensum";

const pensum = usePensumStore();

const modalRefs = ref(null);
const currentPage = ref<number>(1);
const { enrolleds, open, pensumEnrolled, pensumEnrolledGenerate } =
  storeToRefs(pensum);

const headers = [
  { key: "carnet", label: "Carnet", sortable: false },
  { key: "nombres", label: "Nombres", sortable: false },
  { key: "apellidos", label: "Apellidos", sortable: false },
  { key: "nomcarrera", label: "Carrera", sortable: false },
  { key: "actions", label: "" },
];

const perPage = computed(() => {
  if (enrolleds.value?.per_page) {
    return +enrolleds.value.per_page;
  } else {
    return 0;
  }
});

interface Props {
  estado?: string;
  paginate?: number;
  per_page?: number;
}

const paginateFn = (params: Props) => {
  const values = {
    estado: "A",
    paginate: params.paginate || 1,
    per_page: params.per_page || 5,
  };
  pensum.getPagination(values);
};

const changePage = (event: BvEvent, page: number) => {
  paginateFn({ paginate: page });
};

const clickBtn = (carnet: string) => {
  pensum.getPensumAsesoriaStudent(carnet);
};

const hadlerValidar = (args: { id: number; estado: string }) => {
  pensum.updateStatusEnrolled(args.id, { estado: args.estado }).then(() => {
    paginateFn({ paginate: 1 });
  });
};

onBeforeMount(() => {
  paginateFn({});
}); */
</script>

<template>
  <BreadCumbs title="Asesoria" main="Pensum" :button="true" />
  <div class="file-content">
    <b-card no-body>
      <b-tabs class="tabs-student" card>
        <b-tab title="Asesoria">
          <b-card-text>
            <b-card no-body>
              <b-card-body>
                <b-row>
                  <b-col cols="12">
                    <table-asesoria :estado="estado" :per_page="5" ref="table" v-if="estado"/>
                  </b-col>
                </b-row>
              </b-card-body>              
            </b-card>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
<!--   <div class="file-content">
    <div class="card">
      div class="card-header">
        <Search />
      </div>
      <b-table
        :items="enrolleds?.body"
        :fields="headers"
        :per-page="perPage"
        class="b-table asesoria"
      >
        <template #cell(actions)="row">
          <b-button
            variant="success"
            @click="() => clickBtn(row.item.carnet)"
            size="sm"
            class="mr-1"
          >
            Ver
          </b-button>
        </template>
        <template #table-caption>
          <b-pagination
            align="center"
            @page-click="changePage"
            v-model="currentPage"
            :total-rows="enrolleds?.total_rows"
            :per-page="perPage"
            aria-controls="my-table"
          />
        </template>
      </b-table>
    </div>
  </div> -->

  <!-- <b-modal
    hide-footer
    v-model="open"
    no-close-on-esc
    no-close-on-backdrop
    size="xll"
    scrollable
  >
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <div
            class="card"
            v-if="pensumEnrolled?.enrolled && pensumEnrolled.student"
          >
            <TableAsesoria
              :enrolled="pensumEnrolled.enrolled"
              :student="pensumEnrolled.student"
              @validar="hadlerValidar"
            />
          </div>
        </div>
        <div class="col-8">
          <h2 class="text-center">Pensum</h2>
          <Pensum
            :keys="pensumEnrolledGenerate.keys"
            :items="pensumEnrolledGenerate.items"
          />
        </div>
      </div>
    </div>
  </b-modal> -->
</template>

<style>
.modal-dialog.modal-xll {
  max-width: 95%;
}
.tabs-student {
  .card-header {
    background-color: #7265fc;
    padding-bottom: 8px !important;
    button.nav-link {
      text-transform: uppercase;
      color: #fff;
      &.active {
        color: #000;
      }
    }
  }
}
</style>
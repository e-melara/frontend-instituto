<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";

// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import TableAsesoria from "../../components/Asesoria/TableAsesoria.vue";
import TableAsesoriaAdmin from "../../components/Asesoria/Admin/TableAsesoria.vue";

import Pensum from "../../components/Pensum/List.vue";
import { usePensumStore } from "@/stores/usePensum";

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
                    <table-asesoria 
                      v-if="estado"
                      ref="table" 
                      :per_page="5" 
                      :estado="estado"
                    />
                  </b-col>
                </b-row>
              </b-card-body>              
            </b-card>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>

  <b-modal
    hide-footer
    no-close-on-esc
    no-close-on-backdrop
    size="xll"
    scrollable
  >
    <div class="container-fluid">
      <div class="row py-5">
        <div class="col-5">
          <div
            class="card"
          >
          </div>
        </div>
        <div class="col-7">
        </div>
      </div>
    </div>
  </b-modal>
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
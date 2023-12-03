<template>
  <BreadCumbs title="Asesoria" main="Pensum" :button="true" />
  <div v-if="studentEnrolled">
    <ListEnrolled :items="subjetsEnrolled" :status="status" />
  </div>
  <div class="row" v-else>
    <div class="col-12 col-md-5 col-lg-5">
      <AsesoriaList
        :subjects="subjects"
        :has-rol="hasRole"
        @remove="handlerRemoveSubject"
        @send="sendAsesoriaFn"
      />
    </div>
    <div class="col-12 col-md-7 col-lg-7">
      <AsesoriaTable
        :has-rol="hasRole"
        :asesorias="asesoria"
        @validar="validarAsignacion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
// @ts-ignore
import BreadCumbs from "@/shared/BreadCumbs.vue";
// @ts-ignore
import AsesoriaList from "../components/Asesoria/List.vue";

// @ts-ignore
import ListEnrolled from "../components/Asesoria/ListEnrolled.vue";
// @ts-ignore
import AsesoriaTable from "../components/Asesoria/Table.vue";

import { useUtil } from "@/composables";
import type { IHorarioAsesoria } from "../interfaces";
import { usePensum } from "@/pensum/composables/usePensum";

const util = useUtil();
const pensum = usePensum();
const { validarSubjects, removeSubjects, sendAsesoria } = pensum;
const { asesoria, subjects, studentEnrolled, subjetsEnrolled, status } =
  toRefs(pensum);

const validarAsignacion = (args: any) => {
  validarSubjects(args.item, args.codmate, args.nommate);
};

const handlerRemoveSubject = (codmate: string) => {
  removeSubjects(codmate);
};
const sendAsesoriaFn = () => {
  sendAsesoria();
};

// getters
const hasRole = computed(() =>
  util.hasRole("ROLE_PENSUM_STUDENT_ASESORIA_CREAR")
);
</script>

<style lang="scss" scoped></style>

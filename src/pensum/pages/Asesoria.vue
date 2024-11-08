<template>
  <BreadCumbs title="Asesoria" main="Pensum" :button="true" />
  <div>
  </div>
  <div class="row">
    <div class="col-12 col-md-5 col-lg-5">
      <!-- <AsesoriaList
        :has-rol="hasRole"
      /> -->
    </div>
    <div class="col-12 col-md-7 col-lg-7">
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
import { usePensum } from "@/pensum/composables/usePensum";

const util = useUtil();
const pensum = usePensum();

// getters
const hasRole = computed(() =>
  util.hasRole("student.pensum.create")
);
</script>

<style lang="scss" scoped></style>

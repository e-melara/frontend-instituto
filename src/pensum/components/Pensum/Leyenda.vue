<script setup lang="ts">
import { toRefs } from "vue";

// @ts-ignore
import type { ICarrera } from "../../interfaces";

const props = defineProps<{ carrera: ICarrera | null | undefined }>();
const { carrera } = toRefs(props);
</script>

<template>
  <div class="row mb-4 leyenda">
    <div class="col-12">
      <h2>{{ carrera?.nombre  }}</h2>
    </div>
    <section class="col d-flex justify-content-between align-items-center">
      <h5>Aprobadas</h5>
      <div class="item-subject aprobada"></div>
    </section>
    <section class="col d-flex justify-content-between align-items-center">
      <h5>Cursando</h5>
      <div class="item-subject cursando"></div>
    </section>
    <section class="col d-flex justify-content-between align-items-center">
      <h5 style="margin-left: 5px; margin-bottom: 0px">
        Prerequisitos completos
      </h5>
      <div class="item-subject requisitos"></div>
    </section>
    <section class="col d-flex justify-content-between align-items-center">
      <h5>Pendientes</h5>
      <div class="item-subject"></div>
    </section>
    <section class="col d-flex justify-content-between align-items-center">
      <h5>Reprobadas</h5>
      <div class="item-subject reprobada"></div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.item-subject {
  width: 70px;
  height: 70px;
}
.leyenda {
  padding-top: 20px;
  border: 2px solid black;
  section {
    padding: 10px;
    border-top: 2px solid black;
    border-right: 2px solid black;
    &:last-child {
      border-right-width: 0px;
    }
  }
}
</style>

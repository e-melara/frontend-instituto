<script setup lang="ts">
import { toRefs } from "vue";

// @ts-ignore
import type { ICarrera } from "../../interfaces";

interface Props {
  carrera: ICarrera | undefined;
}
const props = defineProps<Props>();
const { carrera } = toRefs(props);
</script>

<template>
  <div class="row">
    <div class="col d-flex justify-content-evenly align-items-center">
      <div class="item-subject aprobada"></div>
      <h5>Aprobadas</h5>
    </div>
    <div class="col d-flex justify-content-evenly align-items-center">
      <div class="item-subject cursando"></div>
      <h5>Cursando</h5>
    </div>
    <div class="col d-flex justify-content-evenly align-items-center">
      <div class="item-subject inscribir"></div>
      <h5 style="margin-left: 5px; margin-bottom: 0px">
        Prerequisitos completos
      </h5>
    </div>
    <div class="col d-flex justify-content-evenly align-items-center">
      <div class="item-subject"></div>
      <h5>Pendientes</h5>
    </div>
    <div class="col d-flex justify-content-evenly align-items-center">
      <div class="item-subject reprobada"></div>
      <h5>Reprobadas</h5>
    </div>
    <div class="col-12" v-if="carrera">
      <h2>{{ carrera.nombre }}</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-subject {
  width: 70px;
  height: 70px;
}
</style>

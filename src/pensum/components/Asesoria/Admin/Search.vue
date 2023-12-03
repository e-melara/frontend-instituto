<script setup lang="ts">
import { ref } from "vue";

const carnet = ref()
const onSubmitEvent = () => {
  console.log("click submit", carnet.value);
};
</script>

<template>
  <div class="d-flex">
    <div class="col-9">
    </div>
    <div class="col-3">
      <form
        action="#"
        method="get"
        class="row g-3"
        @submit.prevent="onSubmitEvent"
      >
        <div class="col-12">
          <input
            type="text"
            class="form-control"
            id="inputPassword2"
            placeholder="Carnet"
            v-model="carnet"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
  title?: string;
  main?: string;
}

const props = defineProps<Props>();
const { title, main } = toRefs(props);
</script>

<template>
  <div class="container-fluid">
    <div class="page-title">
      <div class="row">
        <div class="col-6 d-flex">
          <h3>{{ title }}</h3>
        </div>
        <div class="col-6">
          <ol class="breadcrumb">
            <div class="breadcrumb-item">
              <router-link :to="{ path: '/' }"
                ><vue-feather type="home"></vue-feather
              ></router-link>
            </div>
            <div class="breadcrumb-item" v-if="main">{{ main }}</div>
            <div class="breadcrumb-item" v-if="title">{{ title }}</div>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

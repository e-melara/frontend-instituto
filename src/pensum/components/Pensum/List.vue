<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="key in keys" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="(item, index) in items" :key="index">
            <Card
              v-for="subject in item"
              :key="subject.id"
              :subject="subject"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

// @ts-ignore
import Card from "./Card.vue";
import type { PensumItem } from "../../interfaces";

interface Props {
  keys: string[];
  items: Array<PensumItem[]>;
}

const props = defineProps<Props>();
const { keys } = toRefs(props);
</script>

<style lang="scss" scoped>
table {
  thead,
  tbody {
    tr th,
    tr td {
      text-align: center;
      font-weight: bold;
      font-size: 1.2rem;
      border: 2px solid black;
    }
  }
}
</style>

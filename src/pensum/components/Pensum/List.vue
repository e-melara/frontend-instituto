<template>
  <b-row>
    <b-col class="p-0">
      <div class="table-responsive p-0" >
        <table class="table table-bordered">
          <thead>
            <tr>
              <th v-for="key in group.keys" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="(item, index) in group.subjects" :key="index">
                <Card v-for="subject in item" :key="subject.id" :subject="subject" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-col>
  </b-row>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";

import { tranformPensum } from "../../utils";

// @ts-ignore
import Card from "./Card.vue";
import type { Pensum } from "@/pensum/interfaces";

const props = defineProps<{ items: Pensum[] }>();
const { items } = toRefs(props);

const group = ref({
  keys: [],
  subjects: [],
});

onMounted(() => {
  if (items?.value) {
    tranformPensum(items.value).then(function ({ keys, data }) {
      group.value.keys = [...keys];
      group.value.subjects = data;
    });
  }
});
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

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
                <Card v-for="subject in item" :key="index" :subject="subject" />
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

const props = defineProps<{ items: Pensum[] | null | undefined }>();
const { items } = toRefs(props);

const group = ref({
  keys: [],
  subjects: [],
});

onMounted(() => {
  if (items?.value) {
    tranformPensum(items.value).then((res: any) => {
      if(res['keys']) {
        group.value.keys = res.keys;
      }
      group.value.subjects = res.data;
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

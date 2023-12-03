<template>
  <section
    class="item-subject container-fluid"
    :class="getClassSubject(subject.status)"
  >
    <header class="row">
      <div class="col-3">
        <strong>{{ subject.nopensum }}</strong>
      </div>
      <div class="col-9">{{ subject.codmate }}</div>
    </header>
    <main class="row d-flex align-items-center justify-content-center">
      {{ subject.nommate }}
    </main>
    <article class="row">
      <div class="col-6">{{ subject.codprere }}</div>
      <div class="col-6">{{ subject.univalora }}</div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { def } from "@vue/shared";
import { toRefs } from "vue";
import type { PensumItem } from "../../interfaces";
interface Props {
  subject: PensumItem;
}

const props = defineProps<Props>();
const { subject } = toRefs(props);

enum KeyClass {
  A = "aprobada",
  I = "inscribir",
  R = "reprobada",
  C = "cursando",
}

const getClassSubject = (status: string | undefined): string => {
  switch (status) {
    case "A":
      return KeyClass.A;
    case "I":
      return KeyClass.I;
    case "R":
      return KeyClass.R;
    case "C":
      return KeyClass.C;
    default:
      return "";
  }
};
</script>

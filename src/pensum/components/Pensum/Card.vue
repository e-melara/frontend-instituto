<template>
  <section
   :class="getClassSubject(subject.estado)"
    class="item-subject container-fluid"
  >
    <header class="row">
      <div class="col-3">
        <strong>{{ subject.no_orden }}</strong>
      </div>
      <div class="col-9">{{ subject.codigo_materia }}</div>
    </header>
    <main class="row d-flex align-items-center justify-content-center">
      {{ subject.nombre_materia }}
    </main>
    <article class="row">
      <div class="col-6">{{ subject.requisitos === '0' ? 'Bachillerato' : subject.requisitos }}</div>
      <div class="col-6">{{ subject.creditos }} UV</div>
    </article>
  </section>
</template>

<script setup lang="ts">
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
    case "INSCRIBIR":
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

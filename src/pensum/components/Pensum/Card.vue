<template>
  <section
    class="item-subject container-fluid"
    :class="getClassSubject(subject.estado)"
  >
    <header class="row">
      <div class="col-3">
        <strong>{{ subject.no_orden }}</strong>
      </div>
      <div class="col-9">{{ subject.curso_codigo }}</div>
    </header>
    <main class="row d-flex align-items-center justify-content-center">
      {{ subject.curso_nombre }}
    </main>
    <article class="row">
      <div class="col-6">
        {{ subject.requisitos === "0" ? "Bachillerato" : subject.requisitos }}
      </div>
      <div class="col-6">{{ subject.uv }} UV</div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import type { Pensum } from "../../interfaces";

const props = defineProps<{  subject: Pensum  }>();
const { subject } = toRefs(props);

const mapStatusSubjects = new Map([
  ['A', 'aprobada'],
  ['C', 'cursando'],
  ['P', 'pendiente'],
  ['R', 'requisitos'],
  ['RR', 'reprobada'],
]);

const getClassSubject = (status: string | undefined): string => {
  return mapStatusSubjects.get(status) || '';
};
</script>

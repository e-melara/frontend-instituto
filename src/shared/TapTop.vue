<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
const display = ref<boolean>(false)

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const handleScroll = () => {
  if (window.scrollY > 600) {
    display.value = true
  } else {
    display.value = false
  }
}

const executeScroll = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    class="tap-top"
    :style="[display ? { display: 'block' } : { display: 'none' }]"
  >
    <vue-feather type="chevrons-up" @click="executeScroll"></vue-feather>
  </div>
</template>

<style scoped></style>

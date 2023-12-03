<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, watch, toRefs } from "vue";

import { useAuth } from "@/composables";
import type { IUser } from "@/interfaces";
import profileImage from "@/assets/images/profile.jpg";

const auth = useAuth();
const router = useRouter();

const { people } = toRefs(auth);

const logout = () => {
  auth.logout();
  router.replace({ name: "authenticate-login" });
};
</script>

<template>
  <li class="profile-nav onhover-dropdown p-0 mr-0">
    <div class="media profile-media d-flex">
      <div class="flex-shrink-0">
        <img class="b-r-10" :src="profileImage" alt="profile image" />
      </div>
      <div class="media-body flex-grow-1 ms-3">
        <span>{{ people?.persona?.nombre }}, {{ people?.persona?.apellido }}</span>
        <p class="mb-0 font-roboto arrow-configuration">
          {{ people?.perfil }} <vue-feather type="chevron-down" />
        </p>
      </div>
    </div>
    <ul class="profile-dropdown onhover-show-div">
      <li>
        <a> <vue-feather type="settings" /><span>Configuración</span> </a>
      </li>
      <li>
        <a @click="logout"><vue-feather type="log-in" /><span>Salir</span></a>
      </li>
    </ul>
  </li>
</template>

<style scoped lang="scss">
.arrow-configuration {
  position: relative;
  i.vue-feather--chevron-down {
    top: 5px; 
    position: relative;
    margin-top: -3px !important;
  }
}
</style>

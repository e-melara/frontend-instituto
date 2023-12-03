import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { IRuta } from "@/interfaces";

import { usePensumStore } from "./usePensum";

export const useAuthStore = defineStore("useAuthStore", () => {
  const rutas = ref<IRuta[]>([]);
  const perfil = ref<string>("");
  const roles = ref<string[]>([]);
  const persona = ref<any>();
  const isAuthenticated = ref<boolean>(false);

  return {
    // state
    rutas,
    roles,
    perfil,
    persona,
    isAuthenticated,
    // getters
    /* isAdmin: computed(() => persona.value?.nivel === "1"), */
    //  actions
    setDataUserLogin(people: any, _roles: string[], _perfil: any[]) {
      persona.value = people;
      roles.value = _roles;
      perfil.value = _perfil[0];
      isAuthenticated.value = true;
    },
    getLogout() {
      const pensum = usePensumStore();
      persona.value = undefined;
      isAuthenticated.value = false;
      pensum.clearList();
    },
  };
});

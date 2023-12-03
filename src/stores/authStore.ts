import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { IUser, IRuta } from "@/interfaces";

import { usePensumStore } from "./usePensum";

export const useAuthStore = defineStore("useAuthStore", () => {
  const rutas = ref<IRuta[]>([]);
  const perfil = ref<string>("");
  const roles = ref<string[]>([]);
  const persona = ref<IUser | undefined>(undefined);
  const isAuthenticated = ref<boolean>(false);

  return {
    // state
    rutas,
    roles,
    perfil,
    persona,
    isAuthenticated,
    // getters
    isAdmin: computed(() => persona.value?.nivel === "1"),
    //  actions
    setDataUserLogin(people: IUser, _perfil: string, _roles: string[], _rutas: IRuta[]) {
      roles.value = _roles;
      rutas.value = _rutas;
      perfil.value = _perfil;
      persona.value = people;
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

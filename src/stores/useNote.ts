import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { groupBy, sortBy } from "lodash";

import { authApi } from "@/api/base";
import { useUtil } from "@/composables";

import type {
  IDocenteNotes,
  ICarga,
  CargaAcademicaHistory,
} from "@/notes/interfaces";

export const useNoteStore = defineStore("useNoteStore", () => {
  const util = useUtil();
  const item = ref<ICarga>();
  const show = ref<boolean>(false);
  const data = ref<IDocenteNotes>();
  const notas = ref<CargaAcademicaHistory[]>([]);

  return {
    //getters
    data: computed(() => data.value),
    carga: computed(() => item.value),
    open: computed(() => show.value),
    notas: computed(() => {
      const items = groupBy(notas.value, "ciclolectivo");
      return Object.entries(items)
        .sort((a, b) => {
          const [a1, a2] = a[0].split("-");
          const [b1, b2] = b[0].split("-");
          return Number(a2) - Number(b2) || Number(a1) - Number(b1);
        })
        .map(([key, value]) => ({ ciclo: key, materias: sortBy(value, "ciclo") }));
    }),
    // actions
    async getListaCargasDocente() {
      try {
        util.setLoading(true);
        const cargas = await authApi.get<IDocenteNotes>("/notas");
        // @ts-ignore
        data.value = cargas;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },

    async getDataCargaAcademica(id: number) {
      try {
        util.setLoading(true);
        const carga = await authApi.get<ICarga>(`/notas/${id}/carga`);
        // @ts-ignore
        item.value = carga;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },

    async sendNotesCarga(params: any = {}) {
      this.toggleShowModal();
      try {
        util.setLoading(true);
        const { idcarga: id, ...rest } = params;
        const carga = await authApi.put(`/notas/${id}/carga`, { ...rest });
        // @ts-ignore
        item.value = carga;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },

    async getNotasCicloOrHistory(params: any = {}) {
      try {
        util.setLoading(true);
        const carga = await authApi.get<CargaAcademicaHistory[]>(
          `/notas/me?q=${params.q}`
        );
        const { status, ...rest } = carga;
        // @ts-ignore
        notas.value = Object.values(rest);
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },

    // open modal
    toggleShowModal(open?: boolean) {
      show.value = open === undefined ? !show.value : open;
    },
  };
});

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
  const item = ref<ICarga | any>();
  const show = ref<boolean>(false);
  const data = ref<IDocenteNotes | any>();
  const notas = ref<CargaAcademicaHistory[]>([]);

  const subjectsStudent = ref<any[]>([]);
  const viewNoteTable = ref<{ materia: object, nota: object }>({
    materia: {},
    nota: {}
  });

  return {
    //getters
    data: computed(() => data.value),
    carga: computed(() => item.value),
    open: computed(() => show.value),
    subjectsStudent: computed(() => subjectsStudent.value),
    viewNoteTable: computed(() => viewNoteTable.value),
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
        // @ts-ignore
        const { cargas } = await authApi.get("/v1/materias/docentes");
        this.setCargaAcademica();
        data.value = cargas.filter(function(item: any) {
          if(item && item.materia){
            return true;
          }
          return false
        }).map(function(item: any){
            return {
              id: item.id,
              materia_nombre: item.materia.nombre,
              materia_codigo: item.materia.codigo,
              carrera: item.materia.carrera.nombre
            }
        });
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },

    async getDataCargaAcademica(id: number) {
      try {
        util.setLoading(true);
        const carga = await authApi.get(`/v1/materias/${id}/carga`);
        // @ts-ignore
        item.value = carga.notas;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },

    async getDataConfigMateria(id: number) {
      try {
        util.setLoading(true);
        const carga = await authApi.get(`/v1/materias/${id}`);
        // @ts-ignore
        data.value = carga;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },

    async sendNotesCarga(params: any = {}) {
      try {
        util.setLoading(true);
        const { idcarga: id, ...rest } = params;
        const data = await authApi.put(`/v1/materias/${id}/carga`, { ...rest });
        this.toggleShowModal();
        return Promise.resolve({ response: data });
      } catch (error) {
        return error;
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

    // Actions para los estudiantes
    async getNotasEstudiante() {
      try {
        util.setLoading(true);
        const data = await authApi.get<any>('/v1/alumno/materias');
        // @ts-ignore
        subjectsStudent.value = data['materias'];
      } catch (error) {
        
      } finally {
        util.setLoading(false);
      }
    },

    async getNotaViewId(id: number) {
      try {
        viewNoteTable.value = { materia: {}, nota: {} };
        util.setLoading(true);
        const data = await authApi.get<{ materia: object, nota: object }>('/v1/alumno/materias/' + id);
        viewNoteTable.value = {
          // @ts-ignore
          materia: data.materia,
          // @ts-ignore
          nota: data.nota
        }
      } catch (error) {
        
      } finally {
        util.setLoading(false);
      }
    },
    setCargaAcademica() {
      item.value = undefined;
      data.value = undefined;
    }
  };
});

import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type {
  Enrolled,
  ICarrera,
  Pensum,
  PensumEnrolled,
  Subject,
  Academic,
} from "@/pensum/interfaces";
import { authApi } from "@/api/base";

const getPaginationAxios = async (params = {}): Promise<Enrolled> => {
  // @ts-ignore
  return await authApi.get<Enrolled>("/pensum/paginate", { params });
};

const getSearchAxios = async (carnet: string): Promise<any> => {
  return await authApi.get<PensumEnrolled>(`/v1/alumno/${carnet}/pensum`);
};

const updateStatusEnrolled = async (id: number, params = {}) => {
// @ts-ignore
  return await authApi.put(`/v1/pensum/asesorias/${id}`, params);
};

const pensumAsynFn = async (carnet: string = "me"): Promise<Pensum> => {
// @ts-ignore
  return await authApi.get<Pensum>(`/v1/alumno/${carnet}/pensum`);
};

const pensumAsyncSendFn = async (ids:  Array<number> = []) => {
  return await authApi.post<Subject>("v1/pensum", { ids });
};

const getSubmitEnrolledAsyn = async (ids: Array<number> = [] ) => {
  return await authApi.post<any>('v1/pensum/enrolled', {ids});
}

export const usePensumStore = defineStore("usePensumStore", () => {
  const academicLoads = ref<Academic[]>([]);
  const activeAdvice = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const pensumList = ref<Pensum[]>();
  const carrera = ref<ICarrera>();
  const pensumEnrolled = ref<any[]>([]);

  const filterVisibleOrHidden = (code, haveToShow = false) => {
    academicLoads.value = academicLoads.value.map((load) => {
      if(load.subject_code === code) {
        load.enrolled = haveToShow;
      }
      return load;
    });
  }

  return {
    // state
    pensumList,
    carrera,
    activeAdvice,
    academicLoads,
    // getters
    loading: computed(() => loading.value),
    academicEnrolled: computed(() => pensumEnrolled.value),
    academicNotEnrolled: computed(() => academicLoads.value.filter((load) => !load.enrolled)),
    // actions
    async fetchPensum() {
      loading.value = true;
      try {
        // @ts-ignore
        const { data } = await pensumAsynFn();
        pensumList.value = data?.pensum;
        carrera.value = data?.carrera;
        academicLoads.value = data?.academicLoads;
        activeAdvice.value = !!data?.activeAdvice;
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    },
    pushAcademicLoad(item: any) {
      const { subject_code } = item;
      pensumEnrolled.value?.push(item);
      filterVisibleOrHidden(subject_code, true);
    },
    deleteAcademicLoad(item: any) {
      const { subject_code } = item;
      pensumEnrolled.value = pensumEnrolled.value.filter((load) => {
        return load.subject_code !== subject_code;
      });
      filterVisibleOrHidden(subject_code, false);
    },
    async submitEnrolledSubject() {
      loading.value = true;
      try {
        const ids = pensumEnrolled.value.map(({id}) => id);
        const { data } = await getSubmitEnrolledAsyn(ids);
        return Promise.resolve(data);
      } catch (e) {
        console.log(e)
        return Promise.reject(e);
      } finally {
        loading.value = false;
      }
    }
  }

  // const util = useUtil();
  //
  // const list = ref<Pensum>();
  // const open = ref<boolean>(false);
  //
  // const enrolleds = ref<Enrolled>();
  // const pensumEnrolled = ref<PensumEnrolled | any>();
  //
  // const generatePensum = (pensum: PensumItem[] | any | undefined) => {
  //   const order = groupBy(pensum, "semestre");
  //   const entries = toPairs(order);
  //
  //   const keys = new Array<string>();
  //   const items = new Array<PensumItem[]>();
  //
  //   entries.forEach(([key, ...rest]) => {
  //     keys.push(key);
  //     items.push(rest[0]);
  //   });
  //
  //   return {
  //     keys,
  //     items,
  //   };
  // };
  //
  // return {
  //   // state
  //   list,
  //   enrolleds,
  //   pensumEnrolled,
  //   open,
  //   // getters
  //   carrera: computed(() => list.value?.carrera),
  //   enrolled: computed(() => !!list.value?.enrolled),
  //   pensumList: computed(() => generatePensum(list.value?.pensum)),
  //   pensumEnrolledGenerate: computed(() =>
  //     generatePensum(pensumEnrolled.value?.pensum)
  //   ),
  //   asesoria: computed<CargasAcademica[]>(() => {
  //     return list.value?.cargas_academicas.map((item) => {
  //       return {
  //         ...item,
  //         visible: true,
  //       };
  //     }) || [];
  //   }),
  //   enrolledSubjects: computed(() => {
  //     return list.value?.asesoria_detalle;
  //   }),
  //   estado_asesoria: computed(() => list.value?.aseroria?.estado),
  //   //  actions
  //   setListPensum(newList: Pensum) {
  //     list.value = newList;
  //   },
  //   setSubjectEnrolled(newValues: SubjectEnrolled) {
  //     if (list.value?.enrolled === null) {
  //       list.value = {
  //         ...list.value,
  //         enrolled: { ...newValues },
  //       };
  //     }
  //   },
  //   clearList() {
  //     list.value = undefined;
  //   },
  //   // listado de asesoria para los asesores
  //   async getPagination(params = {}) {
  //     try {
  //       util.setLoading(true);
  //       const data = await getPaginationAxios(params);
  //       enrolleds.value = data;
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       util.setLoading(false);
  //     }
  //   },
  //   async getPensumAsesoriaStudent(carnet: string) {
  //     try {
  //       util.setLoading(true);
  //       const data = await getSearchAxios(carnet);
  //       pensumEnrolled.value = data;
  //       open.value = true;
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       util.setLoading(false);
  //     }
  //   },
  //   async updateStatusEnrolled(id: number, params = {}) {
  //     try {
  //       util.setLoading(true);
  //       await updateStatusEnrolled(id, params);
  //       open.value = false;
  //       util.showAlert({
  //         detail: 'Se ha actualizado el estado de la asesoria correctamente.',
  //         severity: "success",
  //         summary: "Exito",
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       util.showAlert({
  //         detail: 'Error al actualizar el estado de la asesoria.',
  //         severity: "error",
  //         summary: "Error",
  //       })
  //     } finally {
  //       util.setLoading(false);
  //     }
  //   },
  // };
});

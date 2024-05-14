import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { groupBy, toPairs } from "lodash";

import type {
  Pensum,
  Enrolled,
  PensumItem,
  PensumEnrolled,
  SubjectEnrolled,
  CargasAcademica,
} from "@/pensum/interfaces";
import { authApi } from "@/api/base";

import { useUtil } from "@/composables";

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

export const usePensumStore = defineStore("usePensumStore", () => {
  const util = useUtil();

  const list = ref<Pensum>();
  const open = ref<boolean>(false);

  const enrolleds = ref<Enrolled>();
  const pensumEnrolled = ref<PensumEnrolled | any>();

  const generatePensum = (pensum: PensumItem[] | any | undefined) => {
    const order = groupBy(pensum, "semestre");
    const entries = toPairs(order);

    const keys = new Array<string>();
    const items = new Array<PensumItem[]>();

    entries.forEach(([key, ...rest]) => {
      keys.push(key);
      items.push(rest[0]);
    });

    return {
      keys,
      items,
    };
  };

  return {
    // state
    list,
    enrolleds,
    pensumEnrolled,
    open,
    // getters
    carrera: computed(() => list.value?.carrera),
    enrolled: computed(() => !!list.value?.enrolled),
    pensumList: computed(() => generatePensum(list.value?.pensum)),
    pensumEnrolledGenerate: computed(() =>
      generatePensum(pensumEnrolled.value?.pensum)
    ),
    asesoria: computed<CargasAcademica[]>(() => {
      return list.value?.cargas_academicas.map((item) => {
        return {
          ...item,
          visible: true,
        };
      }) || [];
    }),
    enrolledSubjects: computed(() => {
      return list.value?.asesoria_detalle;
    }),
    estado_asesoria: computed(() => list.value?.aseroria?.estado),
    //  actions
    setListPensum(newList: Pensum) {
      list.value = newList;
    },
    setSubjectEnrolled(newValues: SubjectEnrolled) {
      if (list.value?.enrolled === null) {
        list.value = {
          ...list.value,
          enrolled: { ...newValues },
        };
      }
    },
    clearList() {
      list.value = undefined;
    },
    // listado de asesoria para los asesores
    async getPagination(params = {}) {
      try {
        util.setLoading(true);
        const data = await getPaginationAxios(params);
        enrolleds.value = data;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },
    async getPensumAsesoriaStudent(carnet: string) {
      try {
        util.setLoading(true);
        const data = await getSearchAxios(carnet);
        pensumEnrolled.value = data;
        open.value = true;
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },
    async updateStatusEnrolled(id: number, params = {}) {
      try {
        util.setLoading(true);
        await updateStatusEnrolled(id, params);
        open.value = false;
        util.showAlert({
          detail: 'Se ha actualizado el estado de la asesoria correctamente.',
          severity: "success",
          summary: "Exito",
        });
      } catch (error) {
        console.log(error);
        util.showAlert({
          detail: 'Error al actualizar el estado de la asesoria.',
          severity: "error",
          summary: "Error",
        })
      } finally {
        util.setLoading(false);
      }
    },
  };
});

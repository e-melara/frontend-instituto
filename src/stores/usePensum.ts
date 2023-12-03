import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { groupBy, toPairs } from "lodash";

import type {
  Pensum,
  Subject,
  Enrolled,
  IMateria,
  PensumItem,
  PensumEnrolled,
  SubjectEnrolled,
} from "@/pensum/interfaces";
import { authApi } from "@/api/base";

import { useUtil } from "@/composables";

const getPaginationAxios = async (params = {}): Promise<Enrolled> => {
  // @ts-ignore
  return await authApi.get<Enrolled>("/pensum/paginate", { params });
};

const getSearchAxios = async (params = {}): Promise<PensumEnrolled> => {
  // @ts-ignore
  return await authApi.get<PensumEnrolled>("/pensum/search", { params });
};

const updateStatusEnrolled = async (id: number, params = {}) => {
  // @ts-ignore
  return await authApi.put(`/pensum/${id}`, params);
};

export const usePensumStore = defineStore("usePensumStore", () => {
  const util = useUtil();

  const list = ref<Pensum>();
  const open = ref<boolean>(false);

  const enrolleds = ref<Enrolled>();
  const pensumEnrolled = ref<PensumEnrolled>();

  const generatePensum = (pensum: PensumItem[] | undefined) => {
    const order = groupBy(pensum, "ciclopens");
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
    enrolled: computed(() => !!list.value?.enrolled),
    pensumList: computed(() => generatePensum(list.value?.pensum)),
    pensumEnrolledGenerate: computed(() =>
      generatePensum(pensumEnrolled.value?.pensum.pensum)
    ),
    // pensumList: computed(() => {
    //   const order = groupBy(list.value?.pensum, "ciclopens");
    //   const entries = toPairs(order);

    //   const keys = new Array<string>();
    //   const items = new Array<PensumItem[]>();

    //   entries.forEach(([key, ...rest]) => {
    //     keys.push(key);
    //     items.push(rest[0]);
    //   });

    //   return {
    //     keys,
    //     items,
    //   };
    // }),
    asesoria: computed(() => {
      const response: IMateria[] = [];
      const order = groupBy(list.value?.inscribir, "codmate");
      toPairs(order).forEach(([key, ...array]) => {
        const [data] = array;
        response.push({
          ...data[0].materia,
          visible: true,
          horarios: data.map(
            ({ codcarga: id, coddoc, dias, hora: horas, turno }) => ({
              id,
              coddoc,
              dias,
              horas,
              turno,
            })
          ),
        });
      });
      return response;
    }),
    enrolledSubjects: computed(() => {
      if (list.value?.enrolled) {
        const ids = list.value.enrolled.subjects.reduce(
          (acc: number[], prev: Subject) => {
            acc.push(+prev.codcarga);
            return acc;
          },
          []
        );
        return list.value.inscribir.filter((item) => {
          return ids.includes(item.codcarga);
        });
      }
      return null;
    }),
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
        const data = await getSearchAxios({ carnet });
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
        const data = await updateStatusEnrolled(id, params);
        open.value = false;
        util.showAlert({
          // @ts-ignore
          detail: data.message,
          severity: "success",
          summary: "Exito",
        });
      } catch (error) {
        console.log(error);
      } finally {
        util.setLoading(false);
      }
    },
  };
});

import { orderBy } from "lodash";
import { useRouter } from "vue-router";
import { computed, onMounted, watch, ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "vue-query";

import { authApi } from "@/api/base";
import { useUtil, useAuth } from "@/composables";

import type {
  IHorarioAsesoria,
  IMateria,
  Pensum,
  Subjects,
  Subject,
} from "../interfaces";
import { usePensumStore } from "@/stores";
import { storeToRefs } from "pinia";

const pensumAsynFn = async (carnet: string = "me"): Promise<Pensum> => {
  // @ts-ignore
  return await authApi.get<Pensum>(`/v1/alumno/${carnet}/pensum`);
};

const pensumAsyncSendFn = async (ids: number[] = []) => {
  return await authApi.post<Subject>("pensum", { ids });
};

export const usePensum = () => {
  const util = useUtil();
  const auth = useAuth();
  const router = useRouter();
  const store = usePensumStore();
  const queryClient = useQueryClient();

  const subjectsVisibles = ref<IMateria[]>([]);
  const subjectsSeleccionadas = ref<Subjects[]>([]);

  const { pensumList, asesoria, list, enrolled } = storeToRefs(store);

  if (!list.value) {
    const { data } = useQuery({
      queryKey: "pensum",
      queryFn: () => pensumAsynFn(),
      onSuccess: (pensum) => {
        store.setListPensum(pensum);
      },
      onError: (e) => {
        util.showAlert({
          summary: "Error",
          severity: "error",
          detail: "Tenemos un problema por el momento para mostrar la informacion, pongase en contacto con el administrador",
        });
        util.setLoading(false);
      },
      retry: 0,
      cacheTime: 0,
      enabled: !list.value,
    });

    watch(data, (pensum) => {
      if (pensum) {
        store.setListPensum(pensum);
        util.setLoading(false);
      }
    });
  } else {
    subjectsVisibles.value = asesoria.value;
  }

  const { isLoading: sendLoading, mutate } = useMutation(
    (ids: number[]) => pensumAsyncSendFn(ids),
    {
      onSuccess(data) {
        util.showAlert({
          summary: "Exito",
          severity: "success",
          detail: "La matricula fue envianda con exito!",
        });
        // @ts-ignore
        store.setSubjectEnrolled(data);
        router.replace({ name: "pensum-list" });
      },
      onError() {
        util.showAlert({
          summary: "Error",
          severity: "error",
          detail:
            "Por el momento tenemos un problema intenta mas tarde, por favor",
        });
        router.replace({ name: "pensum-list" });
      },
    }
  );

  onMounted(() => {
    if (!list.value) {
      util.setLoading(true);
    }
  });

  watch(sendLoading, (value) => {
    util.setLoading(value);
  });

  watch(asesoria, (values, oldValues) => {
    if (oldValues.length === 0) {
      subjectsVisibles.value = values;
    }
  });

  watch(subjectsSeleccionadas, (subjects) => {
    const ids = subjects.map((item) => {
      return item.codmate;
    });

    const visibleSubjects = asesoria.value.map((item) => {
      return { ...item, visible: !ids.includes(item.codmate) };
    });
    subjectsVisibles.value = visibleSubjects;
  });

  return {
    // asesores
    paginate(params = {}) {
      store.getPagination(params);
    },
    // actions
    sendAsesoria() {
      const ids: number[] = [];
      subjectsSeleccionadas.value.forEach(({ item: { id } }) => {
        ids.push(id);
      });
      mutate(ids);
    },
    validarSubjects: (
      item: IHorarioAsesoria,
      codmate: string,
      nommate: string
    ) => {
      let validar = true;
      const { dias, horas } = item;

      if (subjectsSeleccionadas.value.length >= 5) {
        validar = false;
        util.showAlert({
          severity: "error",
          summary: "Error!",
          detail: "Solo puedes seleccionar una maximo de 5 materias",
        });
      }

      if (validar && subjectsSeleccionadas.value.length > 0) {
        validar = !subjectsSeleccionadas.value.some(({ item: subject }) => {
          return subject.dias === dias && subject.horas === horas;
        });

        if (!validar) {
          util.showAlert({
            severity: "error",
            summary: "Error!",
            detail: "Hay una materia ya seleccionada con este horario",
          });
        }
      }

      if (validar) {
        const object = {
          item,
          codmate,
          nommate: nommate,
        };
        subjectsSeleccionadas.value = [object, ...subjectsSeleccionadas.value];
      }
    },
    removeSubjects: (codmate: string) => {
      subjectsSeleccionadas.value = subjectsSeleccionadas.value.filter(
        (item) => {
          return item.codmate !== codmate;
        }
      );
    },
    // getters
    list: computed(() => pensumList.value),
    carrera: computed(() => list.value?.carrera),
    viewBtnAsesoria: computed(() => {
      return (
        auth.roles.value.includes("ROLE_PENSUM_STUDENT_ASESORIA_VIEW") &&
        list.value?.show
      );
    }),
    status: computed(() => list.value?.enrolled?.estado),
    studentEnrolled: computed(() => enrolled.value),
    subjetsEnrolled: computed(() => store.enrolledSubjects),
    subjects: computed(() => subjectsSeleccionadas.value),
    inscribir: computed(() => {
      return orderBy(list.value?.inscribir, ["codmate", "asc"]);
    }),
    asesoria: computed(() =>
      subjectsVisibles.value.filter((item) => item.visible)
    ),
  };
};

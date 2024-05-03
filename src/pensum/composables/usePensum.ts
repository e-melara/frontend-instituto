import { map, filter } from "lodash";
import { useRouter } from "vue-router";
import { computed, onMounted, watch, ref } from "vue";
import { useMutation, useQuery } from "vue-query";

import { authApi } from "@/api/base";
import { useUtil, useAuth } from "@/composables";

import type {
  CargasAcademica,
  Pensum,
  Subject,
} from "../interfaces";
import { usePensumStore } from "@/stores";
import { storeToRefs } from "pinia";

const pensumAsynFn = async (carnet: string = "me"): Promise<Pensum> => {
  // @ts-ignore
  return await authApi.get<Pensum>(`/v1/alumno/${carnet}/pensum`);
};

const pensumAsyncSendFn = async (ids:  Array<number> = []) => {
  return await authApi.post<Subject>("v1/pensum", { ids });
};

export const usePensum = () => {
  const util = useUtil();
  const auth = useAuth();
  const router = useRouter();
  const store = usePensumStore();

  const subjectsVisibles = ref<CargasAcademica[]>([]);
  const subjectsSeleccionadas = ref<CargasAcademica[]>([]);

  const { pensumList, asesoria, list, enrolled } = storeToRefs(store);

  if (!list.value) {
    const { data } = useQuery({
      queryKey: "pensum",
      queryFn: () => pensumAsynFn(),
      onSuccess: (pensum) => {
        store.setListPensum(pensum);
      },
      onError: () => {
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
    subjectsVisibles.value = asesoria.value as CargasAcademica[];
  }

  const { isLoading: sendLoading, mutate } = useMutation(
    (ids: Array<number>) => pensumAsyncSendFn(ids),
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

  watch(asesoria, (values: CargasAcademica[], oldValues: CargasAcademica[]) => {
    if(oldValues.length === 0) {
      subjectsVisibles.value = values;
    }
  });

  watch(subjectsSeleccionadas, (subjects) => {
    const ids = map(subjects, function({ materia }) {
      return materia.codigo;
    });

    subjectsVisibles.value = asesoria.value.map((item) => {
      return { ...item, visible: !ids.includes(item.materia.codigo) };
    });
  });

  return {
    // asesores
    paginate(params = {}) {
      store.getPagination(params);
    },
    // actions
    async sendAsesoria() {
      let cargas: Array<number> = []
      subjectsSeleccionadas.value.forEach(function(item) {
        cargas.push(item.id)
      });
      try {
        await pensumAsyncSendFn(cargas)
        util.showAlert({
          summary: 'Exito',
          severity: 'success',
          'detail' : 'Asesoria creada con exito'
        })
        router.push({ name: 'pensum-student', replace: true })
      } catch (error : any) {
        const { message } = error.response.data;
        util.showAlert({
          detail: message,
          severity: 'error',
          summary: 'Error'
        })
      }
    },
    validarSubjects: (
      item: CargasAcademica,
    ) => {
      if (subjectsSeleccionadas.value.length >= 5) {
        util.showAlert({
          severity: "error",
          summary: "Error!",
          detail: "Solo puedes seleccionar una maximo de 5 materias",
        });
        return;
      }

      const validar = subjectsSeleccionadas.value.some((subject: CargasAcademica) => {
        return subject.materia_id === item.materia_id;
      });

      if (validar) {
        util.showAlert({
          severity: "error",
          summary: "Error!",
          detail: "Hay una materia ya seleccionada, y solo se puede seleccionar una vez",
        });
        return;
      }
      subjectsSeleccionadas.value = [...subjectsSeleccionadas.value, item];
    },
    removeSubjects: (codmate: string) => {
      const subjects = filter(subjectsSeleccionadas.value, (item) => {
        return item.materia.codigo !== codmate;
      });
      subjectsSeleccionadas.value = [...subjects];
    },
    // getters
    list: computed(() => pensumList.value),
    carrera: computed(() => list.value?.carrera),
    viewBtnAsesoria: computed(() => {
      return (
        auth.roles.value.includes("student.pensum.view") && true
        // list.value?.show
      );
    }),
    status: computed(() => list.value?.enrolled?.estado),
    studentEnrolled: computed(() => enrolled.value),
    subjetsEnrolled: computed(() => store.enrolledSubjects),
    estado_asesoria: computed(() => store.estado_asesoria),
    subjects: computed(() => subjectsSeleccionadas.value),
    inscribir: computed(() => {
      return list.value?.cargas_academicas || [];
    }),
    asesoria: computed(() =>
      subjectsVisibles.value.filter((item) => item.visible)
    ),
    viewAsesoriaBtn: computed(() => list.value?.asesoria_activa)
  };
};

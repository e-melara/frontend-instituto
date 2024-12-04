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

import { useUtil } from '@/composables'

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

const getSubmitEnrolledAsyn = async (ids: Array<number> = [] ) : any => {
  return await authApi.post<any>('v1/pensum/enrolled', {ids});
}

export const usePensumStore = defineStore("usePensumStore", () => {
  const util = useUtil();

  const academicLoads = ref<Academic[]>([]);
  const activeAdvice = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const pensumList = ref<Pensum[]>();
  const carrera = ref<ICarrera>();
  const student = ref<any>({});
  const pensumEnrolled = ref<any[]>([]);

  const filterVisibleOrHidden = (code: any, haveToShow = false) => {
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
    student,
    carrera: computed(() => carrera.value),
    academicLoads,
    // getters
    loading: computed(() => loading.value),
    activeAdvice: computed(() => activeAdvice.value),
    academicEnrolled: computed(() => pensumEnrolled.value),
    academicNotEnrolled: computed(() => academicLoads.value.filter((load) => !load.enrolled)),
    getTextoAsesoriaText: computed(() => {
        const status = activeAdvice.value?.status || 'STUDENT_IS_STUDYING';
        if(status === 'STUDENT_IS_STUDYING') {
          return null;
        }
        return activeAdvice.value?.text;
    }),
    utilAsesoriaBtnModalTitle: computed(() => activeAdvice.value?.status === 'STUDENT_CAN_ENROLL'),
    // actions
    emptyAsesoria() {
      pensumEnrolled.value = [];
    },
    async fetchPensum(carnet = 'me') {
      loading.value = true;
      try {
        // @ts-ignore
        const { data } = await pensumAsynFn(carnet);
        pensumList.value = data?.pensum;
        carrera.value = data?.carrera;
        academicLoads.value = data?.academicLoads;
        activeAdvice.value = data?.activeAdvice;
        if(data?.student) {
          student.value = data.student;
        }
      } catch (e) {
        console.log(e);
      } finally {
        loading.value = false;
      }
    },
    pushAcademicLoad(item: any) : void  {
      const { subject_code } = item;
      pensumEnrolled.value?.push(item);
      filterVisibleOrHidden(subject_code, true);
    },
    deleteAcademicLoad(item: any) : void {
      const { subject_code } = item;
      pensumEnrolled.value = pensumEnrolled.value.filter((load) => {
        return load.subject_code !== subject_code;
      });
      filterVisibleOrHidden(subject_code, false);
    },
    async validarAsesoria(id: number, status: string = '004') {
      loading.value = true;
      try {
        const { message } = await updateStatusEnrolled(id, { status });
        util.showAlert({
          detail: message,
          severity: 'success',
          summary: 'success'
        });
      } catch (e: any) {
        const { message } = e?.response?.data;
        util.showAlert({
          detail: message,
          severity: 'error',
          summary: 'error'
        })
      } finally {
        loading.value = false;
      }
    },
    async submitEnrolledSubject()   {
      loading.value = true;
      try {
        const ids = pensumEnrolled.value.map(({id}) => id);
        if(ids.length === 0) {
          util.showAlert({
            detail: 'Debe seleccionar por lo menos una materia para poder continuar',
            severity: "error",
            summary: "error",
          })
          return;
        }
        const { message } = await getSubmitEnrolledAsyn(ids);
        util.showAlert({
          detail: message,
          severity: 'success',
          summary: 'success'
        });
        this.emptyAsesoria();
        await this.fetchPensum();
      } catch (e: any) {
        console.log(e)
        const { message } = e?.response?.data;
        util.showAlert({
          detail: message,
          severity: 'error',
          summary: 'error'
        })
      } finally {
        loading.value = false;
      }
    }
  };
});

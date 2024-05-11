import { defineStore } from "pinia";

import { authApi } from "@/api/base";
import { computed, ref } from "vue";

const getPaginationAxios = async (params = {}): Promise<any> => {
  return await authApi.get<any>("/v1/asesorias/list", { params });
}

export const useAsesoria = defineStore("useAsesoria", () => {
  // State
  const paginate = ref<any>({
    page: 1,
    total: 0,
    per_page: 5,
    paginate: 0,
  });

  const results = ref<any[]>([]);

  return {
    results : computed(() => results.value ),
    paginate: computed(() => paginate.value),
    // actions
    async getPaginate(params = {}) {
      // util.setLoading(true);
      try {
        const response = await getPaginationAxios(params);
        results.value = response.data.map(function({ id, alumno }: { id:number, alumno: any }) {
          const { carnet, nombres, apellidos, pensum } = alumno;
          const [ {nombre: nombrePensum, carrera } ] = pensum;
          
          return {
            id,
            carnet,
            nombres: `${nombres?.trim()} ${apellidos?.trim()}`,
            pensum: nombrePensum,
            carrera: carrera.nombre,
          }
        });
        paginate.value = {
          total: response.total,
          page: response.current_page,
          per_page: response.per_page,
          paginate: Math.ceil(response.total / response.per_page),
        };
      } catch (error) {
        console.log(error)
      } finally {
        // util.setLoading(false);
      }
    }
  }
});
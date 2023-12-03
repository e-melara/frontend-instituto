import jwtDecode from "jwt-decode";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "vue-query";

import { login } from "@/api/base";
import { useAuthStore } from "@/stores";
import { useUtil, useLocalStorage } from ".";
import type { IUser, LoginInput } from "@/interfaces";

export const useAuth = () => {
  const util = useUtil();
  const router = useRouter();
  const store = useAuthStore();
  const storage = useLocalStorage();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    (params: LoginInput) => login(params),
    {
      onSuccess(data) {
        // @ts-ignore
        const { token } = data;
        queryClient.getQueryCache().clear();
        const decoded: any = jwtDecode(token);
        const { perfil, persona, roles } = decoded;
        storage.setItemFn({ key: "token", value: token });
        storage.setItemFn({ key: "persona", value: persona });
        store.setDataUserLogin(
          persona,
          roles,
          perfil,
        );
        router.replace({
          name: "home",
        });
      },
    }
  );

  watch(isLoading, (newValue) => {
    util.setLoading(newValue);
  });

  const loginFn = async (params: LoginInput) => {
    await mutate(params);
  };

  return {
    // state
    rutas: computed(()  => store.rutas),
    roles: computed(() => store.roles),
    people: computed(() => {
      return {
        persona: store.persona,
        perfil: store.perfil
      }
    }),
    // isAdmin: computed(() => store.isAdmin),
    isLoading: computed(() => isLoading.value),
    // functions
    loginFn,
    setData(token: string, user: IUser) {
      const decoded: any = jwtDecode(token);
      const { perfil, persona, roles } = decoded;
        store.setDataUserLogin(
          persona,
          roles,
          perfil,
        );
    },
    logout: () => {
      store.getLogout();
      storage.removeAll();
      queryClient.getQueryCache().clear();
    },
  };
};

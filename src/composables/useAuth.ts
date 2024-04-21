import jwtDecode from "jwt-decode";
import type { AxiosError } from "axios";
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "vue-query";

import { login, updatePassword } from "@/api/base";
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
      onError({ response }) {
        const { message } = response.data;
        util.showAlert({
          detail: message,
          summary: "Error",
          severity: "error",
        });
        console.log("Error: ", message);
      }
    }
  );

  watch(isLoading, (newValue) => {
    util.setLoading(newValue);
  });

  const loginFn = async (params: LoginInput) => {
    await mutate(params);
  };

  const handlerChangePassword = async (params: any) => {
    let ok = true;
    try {
      util.setLoading(true);
      const data : any = await updatePassword(params);
      util.showAlert({
        // @ts-ignore
        detail: data["message"] as string,
        summary: "Success",
        severity: "success",
      });      
      router.replace({
        name: "authenticate-login",
      });
    } catch (error: AxiosError | any ) {
      const { message } = error.response?.data;
      util.showAlert({
        detail: message,
        summary: "Error",
        severity: "error",
      });
      ok = false;
    } finally {
      util.setLoading(false);
    }
    return ok;
  };

  return {
    // state
    rutas: computed(()  => {
      const token = storage.getItemFn({ key: 'token' })
      const { roles }: any = jwtDecode(token);
      return store.rutas.filter(function( { permissions } ){
        if(permissions && permissions === 'public') {
          return true;
        }
        if(roles.includes(permissions)) {
          return true;
        }
        return false;
      });
    }),
    roles: computed(() => store.roles),
    people: computed(() => {
      return {
        persona: store.persona,
        perfil: store.perfil
      }
    }),
    // isAdmin: computed(() => store.isAdmin),
    // isLoading: computed(() => isLoading.value),
    // functions
    loginFn,
    handlerChangePassword,
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

<script setup lang="ts">
import * as zod from "zod";
import { onMounted } from "vue";
import { toFormValidator } from "@vee-validate/zod";
import { useForm, Field, ErrorMessage } from "vee-validate";

// assets
import loginImage from "@/assets/images/login/undraw_medicine_b-1-ol.svg";

import { useAuth } from "@/composables";
import type { LoginInput } from "@/interfaces";

// variables
const auth = useAuth();

// schema
const validationSchema = toFormValidator(
  zod.object({
    usuario: zod
      .string({
        required_error: "El usuario es requerido",
      })
      .min(6, "El minimo debe ser de 6 caracteres"),
    password: zod
      .string({ required_error: "La contraseña es requerida" })
      .min(6, "El minimo debe ser de 6 caracteres"),
  })
);
// vee validate useForm
const { meta, handleSubmit } = useForm({
  validationSchema,
});

const submit = handleSubmit(async (values) => {
  const params: LoginInput = {
    email: values.usuario,
    password: values.password,
  };
  await auth.loginFn(params);
});
onMounted(() => auth.logout());
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-xl-7" style="background-color: #837eff;"
      >
      <div class="b-center bg-size vh-100 bg-image-opacity col-xl-12" 
        style="
          background-size: auto;
          background-position: center center;
          background-repeat: no-repeat;
        " :style="{ backgroundImage: `url(${loginImage})` }"></div>
      </div>
      <div class="col-xl-5 p-0 vh-100">
        <div class="login-card">
          <div>
            <div>
              <a href="#" class="logo text-left">
                <!-- TODO: Aqui va ir el logo de la institucion -->
                <!-- <img
                  style="width: 100px"
                  class="img-fluid for-light"
                  :src="logoImageLigth"
                  alt="looginpage"
                />
                <img
                  style="width: 100px"
                  class="img-fluid for-dark"
                  :src="logoImageDark"
                  alt="looginpage"
                /> -->
              </a>
            </div>
            <div class="login-main login-form-card">
              <form @submit="submit" autocomplete="off" class="theme-form">
                <h4>Iniciar session</h4>
                <p>Ingrese su usuario y contraseña para iniciar sesión</p>
                <div class="form-group mb-2">
                  <Field name="usuario" v-slot="{ meta, field }" type="text">
                    <input
                      v-bind="field"
                      type="text"
                      class="form-control"
                      placeholder="Usuario"
                      :class="{
                        'is-valid': meta.valid && meta.touched,
                        'is-invalid in-valid': !meta.valid && meta.touched,
                      }"
                    />
                  </Field>
                  <ErrorMessage name="usuario" class="invalid-feedback" />
                </div>
                <div class="form-group mb-2">
                  <label for="password" class="col-form-label"
                    >Contraseña</label
                  >
                  <Field name="password" v-slot="{ meta, field }">
                    <input
                      v-bind="field"
                      type="password"
                      :class="{
                        'is-valid': meta.valid && meta.touched,
                        'is-invalid in-valid': !meta.valid && meta.touched,
                      }"
                      class="form-control"
                      placeholder="*********"
                    />
                  </Field>
                  <ErrorMessage name="password" class="invalid-feedback" />
                </div>
                <div class="form-group mb-0 mt-4">
                  <button
                    class="btn btn-primary active"
                    :disabled="!meta.valid"
                    type="submit"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.bg-image-opacity {
  opacity: 1 !important;
}
@media only screen and (max-width: 1199.98px) {
  .bg-image-opacity {
    opacity: 0 !important;
  }
}
</style>

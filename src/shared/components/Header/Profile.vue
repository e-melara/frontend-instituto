<script setup lang="ts">
import * as zod from "zod";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { toFormValidator } from "@vee-validate/zod";
import { Field, useForm, ErrorMessage } from "vee-validate";

import { useAuth } from "@/composables";
import profileImage from "@/assets/images/profile.jpg";

const auth = useAuth();
const router = useRouter();

const validationSchema = toFormValidator(
  zod.object({
    password: zod
      .string({ required_error: "La contraseña es requerido" })
      .min(8, "El minimo debe ser de 8 caracteres"),
    new_password: zod
      .string({ required_error: "La nueva contraseña es requerida" })
      .min(8, "El minimo debe ser de 8 caracteres"),
    confirm_new_password: zod
      .string({ required_error: "La confirmacion de contraseña es requerida" })
      .min(8, "El minimo debe ser de 8 caracteres"),
  }).refine((data) => data.new_password === data.confirm_new_password, {
    message: "La nueva contraseñas no coinciden con la confirmacion",
    path: ["new_password"],
  })
);

const { meta, handleSubmit, resetForm } = useForm({
  validationSchema,
});

const submit = handleSubmit(async (values) => {  
  const params = {
    current_password: values.password,
    new_password: values.new_password,
    new_confirm_password: values.confirm_new_password,
  };
  if(await auth.handlerChangePassword(params)) {
    resetForm();
    isOpenModalChangePassword.value = false;
  }
});

const isOpenModalChangePassword = ref(false);

const { people } = toRefs(auth);

const logout = () => {
  auth.logout();
  router.replace({ name: "authenticate-login" });
};

const changePasswordModal = () => {
  isOpenModalChangePassword.value = true;
};
</script>

<template>
  <b-modal
    v-model="isOpenModalChangePassword"
    title="Cambio de contraseña"
    size="md"
    no-close-on-esc
    no-close-on-backdrop
    @cancel="isOpenModalChangePassword = false"
    :hide-footer="true"
  >
    <b-container fluid>
      <b-row>
        <form @submit="submit" autocomplete="off" class="theme-form">
          <b-form-group label="Contraseña actual">
            <Field
              name="password"
              type="password"
              v-slot="{ meta, field }"
            >
              <b-form-input 
                v-bind="field" 
                type="password"
                placeholder="Contraseña actual"
                :class="{ 
                  'is-invalid': !meta.valid && meta.touched,                  
                  'is-valid valid': meta.valid && meta.touched,
                }"
              />
            </Field>
            <ErrorMessage name="password" class="invalid-feedback" />
          </b-form-group>
          <b-form-group label="Nueva contraseña">
            <Field
              name="new_password"
              type="password"
              v-slot="{ meta, field }"
            >
              <b-form-input 
                v-bind="field" 
                type="password"
                placeholder="Nueva contraseña"
                :class="{ 
                  'is-invalid': !meta.valid && meta.touched,                  
                  'is-valid valid': meta.valid && meta.touched,
                }"
              />
            </Field>
            <ErrorMessage name="new_password" class="invalid-feedback" />
          </b-form-group>
          <b-form-group label="Confirmar la contraseña">
            <Field
              name="confirm_new_password"
              type="password"
              v-slot="{ meta, field }"
            >
              <b-form-input 
                v-bind="field" 
                type="password"
                placeholder="Confirmar la contraseña"
                :class="{ 
                  'is-invalid': !meta.valid && meta.touched,                  
                  'is-valid valid': meta.valid && meta.touched,
                }"
              />
            </Field>
            <ErrorMessage name="confirm_new_password" class="invalid-feedback" />
          </b-form-group>
          <b-col cols="12" class="text-end d-flex justify-content-between">
            <b-button @click="isOpenModalChangePassword = false" type="button" variant="light">Cancelar</b-button>
            <b-button :disabled="!meta.valid" type="submit" variant="primary">Confirmar</b-button>
          </b-col>
        </form>
      </b-row>
    </b-container>
  </b-modal>
  <li class="profile-nav onhover-dropdown p-0 mr-0">
    <div class="media profile-media d-flex">
      <div class="flex-shrink-0">
        <img class="b-r-10" :src="profileImage" alt="profile image" />
      </div>
      <div class="media-body flex-grow-1 ms-3">
        <span>{{ people?.persona?.nombre }}, {{ people?.persona?.apellido }}</span>
        <p class="mb-0 font-roboto arrow-configuration">
          {{ people?.perfil }} <vue-feather type="chevron-down" />
        </p>
      </div>
    </div>
    <ul class="profile-dropdown onhover-show-div" style="width: 240px;">
      <li>
        <a @click="changePasswordModal()"> <vue-feather type="key" /><span>Cambio de contraseña</span> </a>
      </li>
      <li>
        <a @click="logout"><vue-feather type="log-in" /><span>Salir</span></a>
      </li>
    </ul>
  </li>
</template>

<style scoped lang="scss">
.arrow-configuration {
  position: relative;
  i.vue-feather--chevron-down {
    top: 5px; 
    position: relative;
    margin-top: -3px !important;
  }
}
</style>

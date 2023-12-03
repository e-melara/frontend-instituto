import { createApp } from "vue";
import { createPinia } from "pinia";
import VueFeather from "vue-feather";
import PrimeVue from "primevue/config";
import { VueQueryPlugin } from "vue-query";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import router from "./router";

import "primevue/resources/themes/mdc-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "./assets/scss/app.scss";

const app = createApp(App);
app.use(createPinia());

app.use(router);
app.use(VueQueryPlugin);
app.use(PrimeVue);
app.use(ToastService);

app.component(VueFeather.name, VueFeather);

// filters
app.config.globalProperties.$filters = {
  formatDouble(value: any) {
    return parseFloat(value).toFixed(2);
  },
};

app.mount("#app");

import "@/assets/css/main.scss";
// import 'simplebar/dist/simplebar.min.css';
import "floating-vue/dist/style.css";

import router from "./router/index";

import { createPinia } from "pinia";

import { createApp, h } from "vue";

// =============COMPONENTS SUPPORT=============
import BootstrapVueNext from "bootstrap-vue-next";
import FormValidator from "@/components/shared/FormValidator.vue";
import VueDatePicker from "@vuepic/vue-datepicker";

import VueApexCharts from "vue3-apexcharts";
import ElementPlus from "element-plus";

import vSelect from "vue-select";

import VCalendar from "v-calendar";
import "v-calendar/style.css";

// Sweet alert
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import VueDragscroll from "vue-dragscroll";

import App from "./App.vue";

const pinia = createPinia();

const app = createApp({
  setup() {},
  render: () => h(App),
});

app.use(pinia);
app.use(router);
app.use(BootstrapVueNext);
app.use(VueApexCharts);
app.use(ElementPlus);

app.component("FormValidator", FormValidator);
app.component("VSelect", vSelect);
app.use(VCalendar, {});
app.use(VueDragscroll);

VueDatePicker.props.format.default = "dd/MM/yyyy";
VueDatePicker.props.actionRow.default = {
  showCancel: false,
  showPreview: false,
  showSelect: false,
};
VueDatePicker.props.autoApply.default = true;
app.component("DatePicker", VueDatePicker);

import filters from "@/utilities/filters";
app.config.globalProperties.filters = filters;

import usePermission from "@/composable/permission";
const { hasPermissionOn, blockAccess } = usePermission();
app.config.globalProperties.hasPermissionOn = hasPermissionOn;
app.config.globalProperties.blockAccess = blockAccess;

// globalProperties can only use for options API
app.provide("Swal", Swal);
app.provide("hasPermissionOn", hasPermissionOn);
app.provide("blockAccess", blockAccess);

app.mount("#app");

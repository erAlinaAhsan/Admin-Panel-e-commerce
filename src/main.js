import { createApp } from "vue";
import App from "./App.vue";
import store from './store';
import router from "./router";
import VueApexCharts from "vue3-apexcharts";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css";
import { createPinia } from "pinia";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import "flowbite";
import "./assets/tailwind.css";
import "./assets/animate.css";
import "./assets/sass/css/windzo.css";
import vClickOutside from "click-outside-vue3";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.use(createPinia());
app.use(VueApexCharts);
app.use(PerfectScrollbar);
app.use(vClickOutside);
// store.dispatch('fetchStoredData');
app.mount("#app");

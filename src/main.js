import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue} from 'bootstrap-vue';//I ADDED NOW
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css';

import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
Vue.use(BootstrapVue);//I ADDED NOW
const router = new VueRouter({
  routes,
});
export const EventBus = new Vue();
import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  ModalPlugin,
  BootstrapVueIcons,
  IconsPlugin,
  FormFilePlugin, 
  FormTextareaPlugin,
  PopoverPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  ModalPlugin,
  BootstrapVueIcons,
  IconsPlugin,
  FormFilePlugin,
  FormTextareaPlugin,
  PopoverPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

export const shared_data = {
  server_domain: "http://localhost:3000",
  username: localStorage.getItem("username"), // Updated to use getItem method
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    EventBus.$emit('user-logged-in', username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("lastSearchQuery"); // Clear the last search query on logout
    this.username = null;
    EventBus.$emit('user-logged-out');
  },
};
console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");

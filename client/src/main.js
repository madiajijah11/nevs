import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import { Form } from "vee-validate";
import Vuex from 'vuex'

Axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

export const app = createApp(App);

createApp(App).use(store).use(router).use(Form).use(Vuex).mount("#app");

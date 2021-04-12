import { createStore } from "vuex";
import { auth } from "./auth.store";

export default new createStore({
  modules: {
    auth,
  },
});

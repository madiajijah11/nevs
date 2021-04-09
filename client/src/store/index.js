import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Axios from "axios";

const getDefaultState = () => {
  return {
    token: "",
    user: {},
  };
};

export default createStore({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    telahMasuk: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: (state) => {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    masuk: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);
      // SET AUTH HEADER
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    keluar: ({ commit }) => {
      commit("RESET", "");
    },
  },
});

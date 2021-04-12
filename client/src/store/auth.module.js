import AuthService from "../services/auth.service";

const pengguna = JSON.parse(localStorage.getItem("pengguna"));
const initialState = pengguna
  ? { status: { telahMasuk: true }, pengguna }
  : { status: { telahMasuk: false }, pengguna: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    masuk({ commit }, pengguna) {
      return AuthService.masuk(pengguna).then(
        (pengguna) => {
          commit("masukBerhasil", pengguna);
          return Promise.resolve(pengguna);
        },
        (error) => {
          commit("masukGagal");
          return Promise.reject(error);
        }
      );
    },
    keluar({ commit }) {
      AuthService.keluar();
      commit("keluar");
    },
    daftar({ commit }, pengguna) {
      return AuthService.daftar(pengguna).then(
        (response) => {
          commit("daftarBerhasil");
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("daftarGagal");
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    masukBerhasil(state, pengguna) {
      state.status.telahMasuk = true;
      state.pengguna = pengguna;
    },
    masukGagal(state) {
      state.status.telahMasuk = false;
      state.pengguna = null;
    },
    keluar(state) {
      state.status.telahMasuk = false;
      state.pengguna = null;
    },
    daftarBerhasil(state) {
      state.status.telahMasuk = false;
    },
    daftarGagal(state) {
      state.status.telahMasuk = false;
    },
  },
};

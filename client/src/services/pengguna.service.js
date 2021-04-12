import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/publik/";

class ServisPengguna {
  getKontenPublik() {
    return axios.get(API_URL + "semua");
  }

  getPapanPengguna() {
    return axios.get(API_URL + "pengguna", { headers: authHeader() });
  }

  getPapanModerator() {
    return axios.get(API_URL + "moderator", { headers: authHeader() });
  }

  getPapanAdmin() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new ServisPengguna();

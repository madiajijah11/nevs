import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:3000/api/publik";

class ServicePengguna {
  getPublikKonten() {
    return axios.get(API_URL + "semua");
  }

  getPapanPenguna() {
    return axios.get(API_URL + "pengguna", { headers: authHeader() });
  }

  getPapanModerator() {
    return axios.get(API_URL + "moderator", { headers: authHeader() });
  }

  getPapanAdmin() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new ServicePengguna();

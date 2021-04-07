// src/services/AuthService.js

import axios from "axios";

const url = "http://localhost:3000/api/";

export default {
  masuk(credentials) {
    return axios
      .post(url + "masuk/", credentials)
      .then((response) => response.data);
  },
  daftar(credentials) {
    return axios
      .post(url + "daftar/", credentials)
      .then((response) => response.data);
  },
  getSecretContent() {
    return axios.get(url + "dashboard/").then((response) => response.data);
  },
};

import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
  masuk(pengguna) {
    return axios
      .post(API_URL + "masuk", {
        namalengkap: pengguna.namalengkap,
        username: pengguna.username,
        password: pengguna.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("pengguna", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  keluar() {
    localStorage.removeItem("pengguna");
  }

  daftar(pengguna) {
    return axios.post(API_URL + "daftar", {
      namalengkap: pengguna.namalengkap,
      username: pengguna.username,
      email: pengguna.email,
      password: pengguna.password,
    });
  }
}

export default new AuthService();

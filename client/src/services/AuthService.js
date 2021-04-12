import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

class AuthService {
  masuk(pengguna) {
    return axios
      .post(API_URL + "masuk", {
        username: pengguna.username,
        password: pengguna.password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("pengguna", JSON.stringify(res.data));
        }
        return res.data;
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

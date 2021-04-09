<template>
  <div class="container">
    <br>
    <div class="columns">
      <div class="column">
        <div class="card-content"></div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Selamat datang, Masuk untuk melanjutkan.
            </p>
          </header>
          <div class="card-content">
            <div class="field">
              <label for="Email">Email</label>
              <input
                class="input"
                type="email"
                placeholder="e.g dian@example.com"
                v-model="email"
              />
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input
                class="input"
                type="password"
                placeholder="e.g abc123"
                v-model="password"
              />
            </div>
            <div class="field buttons">
              <button class="button is-primary" @click="masuk">Masuk</button>
              <router-link to="/" class="button is-danger is-outlined"
                >Kembali</router-link
              >
              <p class="help is-danger" v-if="msg">{{ msg }}</p>
            </div>
            <footer class="card-footer">
              <router-link
                to="/daftar"
                class="button is-info is-outlined card-footer-item"
                >Belum punya akun?, daftar disini!</router-link
              >
            </footer>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card-content"></div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async masuk() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        const response = await AuthService.masuk(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;

        this.$store.dispatch("masuk", { token, user });

        this.$router.push("/users/dashboard");
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

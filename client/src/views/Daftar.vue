// src/views/Daftar.vue

<template>
  <div class="container" id="kontainer">
    <div class="columns">
      <div class="column">
        <div class="card-content">

        </div>
      </div>
      <div class="column">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Silahkan daftar untuk melanjutkan.</p>
          </header>
          <div class="card-content">
            <div class="field">
              <label for="email">Email</label>
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
            <div class="field">
              <label for="confirm_password">Ulangi Password</label>
              <input
                class="input"
                type="password"
                placeholder="ketik ulang password"
                v-model="confirm_password"
              />
            </div>
            <div class="field is-grouped">
              <button class="button is-primary" @click="daftar">Daftar</button>
              <p v-if="msg" class="help is-danger">{{ msg }}</p>
            </div>
            <footer class="card-footer">
              <router-link
                to="/masuk"
                class="button is-info is-outlined card-footer-item"
                >Sudah punya akun?, Klik disini!!</router-link
              >
              <router-link
                to="/"
                class="button is-danger is-outlined card-footer-item"
                >Kembali</router-link
              >
            </footer>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card-content">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirm_password: "",
      msg: "",
    };
  },
  methods: {
    async daftar() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password,
        };
        const response = await AuthService.daftar(credentials);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>
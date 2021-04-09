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
            <p class="card-header-title">Silahkan daftar untuk melanjutkan.</p>
          </header>
          <div class="card-content">
            <div class="field">
              <label for="namalengkap">Nama Lengkap</label>
              <input
                class="input"
                type="text"
                placeholder="e.g Dian Rahmadani"
                v-model="namalengkap"
              />
            </div>
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
            <div class="field buttons">
              <button class="button is-primary" @click="daftar">Daftar</button>
              <router-link to="/" class="button is-danger is-outlined">Kembali</router-link>
              <p v-if="msg" class="help is-danger">{{ msg }}</p>
            </div>
            <footer class="card-footer">
              <router-link
                to="/masuk"
                class="button is-info is-outlined card-footer-item"
                >Sudah punya akun?, Klik disini!!</router-link
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
      namalengkap: "",
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
          namalengkap: this.namalengkap,
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

<style>
</style>
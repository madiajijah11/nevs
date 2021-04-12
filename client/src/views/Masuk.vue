<template>
  <div class="container">
    <br />
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
            <form @submit.prevent="handleMasuk" action="" name="form">
              <div class="field">
                <label for="username">Username</label>
                <input
                  class="input"
                  type="text"
                  placeholder="e.g dianrahmadani"
                  v-model="pengguna.username"
                  v-validate="'required'"
                  name="username"
                />
                <div
                  v-if="errors.has('username')"
                  class="has-text-danger"
                  role="alert"
                >
                  Username diperlukan!
                </div>
              </div>
              <div class="field">
                <label for="password">Password</label>
                <input
                  class="input"
                  type="password"
                  placeholder="e.g abc123"
                  v-model="pengguna.password"
                  v-validate="'required'"
                  name="password"
                />
                <div
                  v-if="errors.has('password')"
                  class="has-text-danger"
                  role="alert"
                >
                  Password diperlukan!
                </div>
              </div>
              <div class="field buttons">
                <button class="button is-primary" :disabled="loading">
                  <span v-show="loading" class=""></span>
                  <span>Masuk</span>
                </button>
                <router-link to="/" class="button is-danger is-outlined"
                  >Kembali</router-link
                >
                <p class="help is-danger" v-if="message" role="alert">
                  {{ message }}
                </p>
              </div>
            </form>
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
    <br />
  </div>
</template>

<script>
import Pengguna from "../models/pengguna";

export default {
  name: "Masuk",
  data() {
    return {
      pengguna: new Pengguna("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    telahMasuk() {
      return this.$store.state.auth.status.telahMasuk;
    },
  },
  created() {
    if (this.telahMasuk) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleMasuk() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.pengguna.username && this.pengguna.password) {
          this.$store.dispatch("auth/masuk", this.pengguna).then(
            () => {
              this.$router.push("/profile");
            },
            (error) => {
              (this.loading = false),
                (this.message =
                  (error.res && error.res.data) ||
                  error.message ||
                  error.toString());
            }
          );
        }
      });
    },
  },
};
</script>
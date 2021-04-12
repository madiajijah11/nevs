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
            <p class="card-header-title">Silahkan daftar untuk melanjutkan.</p>
          </header>
          <div class="card-content">
            <form action="" @submit.prevent="handleDaftar" name="form">
              <div v-if="!successful">
                <div class="field">
                  <label for="namalengkap">Nama Lengkap</label>
                  <input
                    class="input"
                    type="text"
                    placeholder="e.g Dian Rahmadani"
                    v-model="pengguna.namalengkap"
                    v-validate="'required|min:3|max:20'"
                    name="namalengkap"
                  />
                  <div
                    v-if="submitted && errors.has('namalengkap')"
                    class="has-text-danger"
                  >
                    {{ errors.first("namalengkap") }}
                  </div>
                </div>
                <div class="field">
                  <label for="email">Email</label>
                  <input
                    class="input"
                    type="email"
                    placeholder="e.g dian@example.com"
                    v-model="pengguna.email"
                    v-validate="'required|email|max:50'"
                    name="email"
                  />
                  <div
                    v-if="submitted && errors.has('email')"
                    class="has-text-danger"
                  >
                    {{ errors.first("email") }}
                  </div>
                </div>
                <div class="field">
                  <label for="password">Password</label>
                  <input
                    class="input"
                    type="password"
                    placeholder="e.g abc123"
                    v-model="pengguna.password"
                    v-validate="'required|min:6|max:40'"
                    name="password"
                  />
                  <div
                    v-if="submitted && errors.has('password')"
                    class="alert-danger"
                  >
                    {{ errors.first("password") }}
                  </div>
                </div>
                <div class="field buttons">
                  <button class="button is-primary">Daftar</button>
                  <router-link to="/" class="button is-danger is-outlined"
                    >Kembali</router-link
                  >
                  <p
                    v-if="message"
                    class="help"
                    :class="successful ? 'help-is-success' : 'help-is-danger'"
                  >
                    {{ message }}
                  </p>
                </div>
              </div>
            </form>
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
    <br />
  </div>
</template>

<script>
import Pengguna from "../models/pengguna";

export default {
  name: "Daftar",
  data() {
    return {
      pengguna: new Pengguna("", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    telahMasuk() {
      return this.$store.state.auth.status.telahMasuk;
    },
  },
  mounted() {
    if (this.telahMasuk) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleDaftar() {
      this.message = "";
      (this.submitted = true),
        this.$validator.validate().then((isValid) => {
          if (isValid) {
            this.$store.dispatch("auth/daftar", this.pengguna).then(
              (data) => {
                this.message = data.message;
                this.successful = true;
              },
              (error) => {
                this.message =
                  (error.res && error.res.data) ||
                  error.message ||
                  error.toString();
                this.successful = false;
              }
            );
          }
        });
    },
  },
};
</script>

<style>
</style>
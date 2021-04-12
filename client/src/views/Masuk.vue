<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div class="card-header">
        <h4>Silahkan Masuk untuk melanjutkan</h4>
      </div>
      <div class="card-body">
        <form name="form" @submit.prevent="tahanMasuk">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="pengguna.username"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="username"
            />
            <div
              v-if="errors.has('username')"
              class="alert alert-danger"
              role="alert"
            >
              Username di perlukan!
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="pengguna.password"
              v-validate="'required'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="errors.has('password')"
              class="alert alert-danger"
              role="alert"
            >
              Password di perlukann!
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Masuk</span>
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <router-link to="/daftar" class=""
          >Belum Punya Akun?, klik disini.</router-link
        >
      </div>
    </div>
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
      this.$router.push("/akun/profile");
    }
  },
  methods: {
    tahanMasuk() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.pengguna.username && this.pengguna.password) {
          this.$store.dispatch("auth/masuk", this.pengguna).then(
            () => {
              this.$router.push("/akun/profile");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 450px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
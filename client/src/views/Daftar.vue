<template>
  <div class="col-md-12">
    <div class="card card-container">
      <div class="card-header">
        <h4>Silahkan Daftar untuk melanjutkan</h4>
      </div>
      <div class="card-body">
        <form name="form" @submit.prevent="tahanDaftar">
          <div v-if="!successful">
            <div class="form-group">
              <label for="namalengkap">Nama Lengkap</label>
              <input
                v-model="pengguna.namalengkap"
                v-validate="'required|min:1|max:50'"
                type="text"
                class="form-control"
                name="namalengkap"
              />
              <div
                v-if="submitted && errors.has('namalengkap')"
                class="alert-danger"
              >
                {{ errors.first("namalengkap") }}
              </div>
            </div>
            <div class="form-group">
              <label for="username">Username</label>
              <input
                v-model="pengguna.username"
                v-validate="'required|min:3|max:20'"
                type="text"
                class="form-control"
                name="username"
              />
              <div
                v-if="submitted && errors.has('username')"
                class="alert-danger"
              >
                {{ errors.first("username") }}
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="pengguna.email"
                v-validate="'required|email|max:50'"
                type="email"
                class="form-control"
                name="email"
              />
              <div v-if="submitted && errors.has('email')" class="alert-danger">
                {{ errors.first("email") }}
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                v-model="pengguna.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
              />
              <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
              >
                {{ errors.first("password") }}
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block">Daftar</button>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <router-link to="/masuk" class=""
          >Sudah Punya Akun?, klik disini.</router-link
        >
      </div>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import Pengguna from "../models/pengguna";

export default {
  name: "Daftar",
  data() {
    return {
      pengguna: new Pengguna("", "", ""),
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
    tahanDaftar() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("auth/daftar", this.pengguna).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
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
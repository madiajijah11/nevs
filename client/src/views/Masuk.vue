// src/views/Masuk.vue

<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Masuk</p>
      </header>
      <div class="card-content">
        <div class="field">
          <label for="Email">Email</label>
          <input
            class="input"
            type="text"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input
            class="input"
            type="text"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <input
          class="button is-primary"
          type="button"
          @click="masuk"
          value="Masuk"
        />
        <p class="help is-danger" v-if="msg">{{ msg }}</p>
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

        this.$router.push("/dashboard");
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>
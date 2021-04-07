// src/views/Masuk.vue

<template>
  <div>
    <h1>Masuk</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="button" @click="masuk" value="Masuk" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
import AuthService from '../services/AuthService.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      msg: ''
    };
  },
  methods: {
    async masuk() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await AuthService.masuk(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;

        this.$store.dispatch('masuk', { token, user });

        this.$router.push('/dashboard');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>
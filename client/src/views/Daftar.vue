// src/views/Daftar.vue

<template>
  <div>
    <h1>Daftar</h1>
    <input type="text" placeholder="email" v-model="email" />
    <input type="text" placeholder="Password" v-model="password" />
    <input
      type="text"
      placeholder="Password (repeat)"
      v-model="confirm_password"
    />
    <input type="button" @click="daftar" value="Sign Up" />
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
      confirm_password: '',
      msg: ''
    };
  },
  methods: {
    async daftar() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
          confirm_password: this.confirm_password
        };
        const response = await AuthService.daftar(credentials);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>
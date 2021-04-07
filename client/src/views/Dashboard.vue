// src/views/Dashboard.vue

<template>
  <div>
    <h1>Hi {{ email }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Keluar" @click="keluar" />
  </div>
</template>

<script>
import AuthService from '../services/AuthService.js';

export default {
  data() {
    return {
      secretMessage: '',
      email: ''
    };
  },
  async created() {
    if (!this.$store.getters.telahMasuk) {
      this.$router.push('/masuk');
    }

    this.email = this.$store.getters.getUser.email;

    this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    keluar() {
      this.$store.dispatch('keluar');
      this.$router.push('/masuk');
    }
  }
};
</script>
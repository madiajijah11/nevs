<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{konten}}</h3>
    </header>
  </div>
</template>

<script>
import ServisPengguna from '../services/pengguna.service';

export default {
  name: 'Admin',
  data() {
    return {
      konten: ''
    };
  },
  mounted() {
    ServisPengguna.getPapanAdmin().then(
      response => {
        this.konten = response.data;
      },
      error => {
        this.konten =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
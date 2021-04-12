<template>
  <div class="container-fluid">
    <header class="jumbotron">
      <h3>{{ konten }}</h3>
    </header>
  </div>
</template>

<script>
import ServisPengguna from "../services/pengguna.service";

export default {
  name: "Pengguna",
  data() {
    return {
      konten: "",
    };
  },
  mounted() {
    ServisPengguna.getPapanPengguna().then(
      (response) => {
        this.konten = response.data;
      },
      (error) => {
        this.konten =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
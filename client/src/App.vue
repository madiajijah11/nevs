<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>Dian Rahmadani</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />&nbsp;Home
          </router-link>
        </li>
        <li v-if="tampilPapanAdmin" class="nav-item">
          <router-link to="/akun/admin" class="nav-link">Papan Admin</router-link>
        </li>
        <li v-if="tampilPapanModerator" class="nav-item">
          <router-link to="/akun/moderator" class="nav-link"
            >Papan Moderator</router-link
          >
        </li>
        <li class="nav-item">
          <router-link v-if="penggunaSekarang" to="/akun/pengguna" class="nav-link"
            >Pengguna</router-link
          >
        </li>
      </div>

      <div v-if="!penggunaSekarang" class="navbar-nav ml-auto">
          <li class="nav-item">
          <router-link to="/daftar" class="btn btn-primary mr-1">
            <font-awesome-icon icon="user-plus" />&nbsp;Daftar
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/masuk" class="btn btn-light">
            <font-awesome-icon icon="sign-in-alt" />&nbsp;Masuk
          </router-link>
        </li>
      </div>

      <div v-if="penggunaSekarang" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/akun/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ penggunaSekarang.namalengkap }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="btn btn-outline-danger" href @click.prevent="keluar">
            <font-awesome-icon icon="sign-out-alt" />&nbsp;Keluar
          </a>
        </li>
      </div>
    </nav>
    <br />
    <div class="container">
      <router-view />
    </div>
    <br />
      <footer class="modal-footer">
        <p>
          <strong>Created & Developed</strong> by
          <a href="https://github.com/madiajijah11">Dian Rahmadani</a>. The source code is
          licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >CC BY NC SA 4.0</a
          >.
        </p>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    penggunaSekarang() {
      return this.$store.state.auth.pengguna;
    },
    tampilPapanAdmin() {
      if (this.penggunaSekarang && this.penggunaSekarang.roles) {
        return this.penggunaSekarang.roles.includes("ROLE_ADMIN");
      }

      return false;
    },
    tampilPapanModerator() {
      if (this.penggunaSekarang && this.penggunaSekarang.roles) {
        return this.penggunaSekarang.roles.includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    keluar() {
      this.$store.dispatch("auth/keluar");
      this.$router.push("/masuk");
    },
  },
};
</script>
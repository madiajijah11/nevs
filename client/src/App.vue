<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href @click.prevent>
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/home">
            <i class="fas fa-home"></i> Home
          </router-link>
          <router-link v-if="tampilPapanAdmin" to="/admin" class="navbar-item"
            >Papan Admin</router-link
          >
          <router-link
            v-if="tampilPapanModerator"
            to="/moderator"
            class="navbar-item"
            >Papan Moderator</router-link
          >
          <router-link v-if="currentPengguna" to="/pengguna" class="navbar-item"
            >Papan Pengguna</router-link
          >
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div v-if="!currentPengguna">
              <router-link class="button is-primary" to="/daftar">
                <i class="fas fa-user-plus"></i> Daftar
              </router-link>
              <router-link class="button is-light" to="/masuk">
                <i class="fas fa-sign-in-alt"></i> Masuk
              </router-link>
            </div>
            <div v-if="currentPengguna">
              <router-link class="button is-primary" to="/profile">
                <i class="fas fa-users"></i> {{ currentPengguna.username }}
              </router-link>
              <a class="button is-light" href @click.prevent="keluar">
                <i class="fas fa-sign-out-alt"></i> Keluar
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <br />
    <div class="container">
      <router-view />
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Created & Developed</strong> by
          <a href="https://github.com/madiajijah11">Dian Rahmadani</a>. The
          source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >CC BY NC SA 4.0</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    currentPengguna() {
      return this.$store.state.auth.pengguna;
    },
    tampilPapanAdmin() {
      if (this.currentPengguna && this.currentPengguna.roles) {
        return this.currentPengguna.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    tampilPapanModerator() {
      if (this.currentPengguna && this.currentPengguna.roles) {
        return this.currentPengguna.roles.includes("ROLE_MODERATOR");
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

<style>
</style>
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
          <router-link to="/akun/admin" class="nav-link"
            >Papan Admin</router-link
          >
        </li>
        <li v-if="tampilPapanModerator" class="nav-item">
          <router-link to="/akun/moderator" class="nav-link"
            >Papan Moderator</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            v-if="penggunaSekarang"
            to="/akun/pengguna"
            class="nav-link"
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
    <div class="container-fluid">
      <router-view />
    </div>
    <br />
    <footer class="container-fluid py-5 bg-light">
      <div class="row">
        <div class="col-12 col-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="d-block mb-2"
            role="img"
            viewBox="0 0 24 24"
          >
            <title>BRI</title>
            <circle cx="12" cy="12" r="10" />
            <path
              d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"
            />
          </svg>
          <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
        </div>
        <div class="col-6 col-md">
          <h5>Features</h5>
          <ul class="list-unstyled text-small">
            <li><a class="link-secondary" href="#">Cool stuff</a></li>
            <li><a class="link-secondary" href="#">Random feature</a></li>
            <li><a class="link-secondary" href="#">Team feature</a></li>
            <li><a class="link-secondary" href="#">Stuff for developers</a></li>
            <li><a class="link-secondary" href="#">Another one</a></li>
            <li><a class="link-secondary" href="#">Last time</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>Resources</h5>
          <ul class="list-unstyled text-small">
            <li><a class="link-secondary" href="#">Resource name</a></li>
            <li><a class="link-secondary" href="#">Resource</a></li>
            <li><a class="link-secondary" href="#">Another resource</a></li>
            <li><a class="link-secondary" href="#">Final resource</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>Resources</h5>
          <ul class="list-unstyled text-small">
            <li><a class="link-secondary" href="#">Business</a></li>
            <li><a class="link-secondary" href="#">Education</a></li>
            <li><a class="link-secondary" href="#">Government</a></li>
            <li><a class="link-secondary" href="#">Gaming</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>About</h5>
          <ul class="list-unstyled text-small">
            <li><a class="link-secondary" href="#">Team</a></li>
            <li><a class="link-secondary" href="#">Locations</a></li>
            <li><a class="link-secondary" href="#">Privacy</a></li>
            <li><a class="link-secondary" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
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
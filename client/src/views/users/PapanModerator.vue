<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item is-rounded" href="/">
          <strong><i class="fas fa-paw"></i>&nbsp;DIAN RAHMADANI</strong>
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
          <router-link class="navbar-item" to="/"> Home </router-link>

          <a class="navbar-item"> Documentation </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> More </a>

            <div class="navbar-dropdown">
              <a class="navbar-item"> About </a>
              <a class="navbar-item"> Jobs </a>
              <a class="navbar-item"> Contact </a>
              <hr class="navbar-divider" />
              <a class="navbar-item"> Report an issue </a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <p class="card-header-title">Hi, {{ namalengkap }}</p>
            <button class="button is-danger" @click="keluar">Keluar</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="content">
      <br />
      <div class="columns is-desktop">
        <div class="column">
          <router-link to="/nasabahmaster" class="box"
            >Nasabah Master <i class="fas fa-arrow-circle-right"></i
          ></router-link>
        </div>
        <div>
          <h3>{{ konten }}</h3>
        </div>
        <div class="column"><a class="box">Menu Kedua</a></div>
        <div class="column"><a class="box">Menu Ketiga</a></div>
        <div class="column"><a class="box">Menu Keempat</a></div>
      </div>
      <div class="box">
        <p>Project masih dalam proses</p>
        <progress class="progress is-primary" max="100">7%</progress>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box">
            <p class="title">One</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
          <div class="tile is-child box">
            <p class="title">Two</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
              non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">Three</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              semper diam at erat pulvinar, at pulvinar felis blandit.
              Vestibulum volutpat tellus diam, consequat gravida libero rhoncus
              ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta
              orci, quis semper odio felis ut quam.
            </p>
            <p>
              Suspendisse varius ligula in molestie lacinia. Maecenas varius
              eget ligula a sagittis. Pellentesque interdum, nisl nec interdum
              maximus, augue diam porttitor lorem, et sollicitudin felis neque
              sit amet erat. Maecenas imperdiet felis nisi, fringilla luctus
              felis hendrerit sit amet. Aenean vitae gravida diam, finibus
              dignissim turpis. Sed eget varius ligula, at volutpat tortor.
            </p>
            <p>
              Integer sollicitudin, tortor a mattis commodo, velit urna rhoncus
              erat, vitae congue lectus dolor consequat libero. Donec leo
              ligula, maximus et pellentesque sed, gravida a metus. Cras
              ullamcorper a nunc ac porta. Aliquam ut aliquet lacus, quis
              faucibus libero. Quisque non semper leo.
            </p>
          </div>
        </div>
      </div>
      <br />
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
import PenggunaService from "../../services/PenggunaService.js";

export default {
  name: "Moderator",
  data() {
    return {
      konten: "",
    };
  },
  mounted() {
    PenggunaService.getPapanModerator().then(
      (res) => {
        this.konten = res.data;
      },
      (error) => {
        this.konten =
          (error.res && error.res.data) || error.message || error.toString();
      }
    );
  },
  methods: {
    keluar() {
      this.$store.dispatch("keluar");
      this.$router.push("/masuk");
    },
  },
};
</script>

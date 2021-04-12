<template>
  <div class="container">
    <br />
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{ currentPengguna.username }}</p>
      </header>
      <div class="card-content">
        <p>
          <strong>Token:</strong>
          {{ currentPengguna.accessToken.substring(0, 20) }} ...
          {{
            currentPengguna.accessToken.substr(
              currentPengguna.accessToken.length - 20
            )
          }}
        </p>
        <p>
          <strong>Id:</strong>
          {{ currentPengguna.id }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ currentPengguna.email }}
        </p>
        <strong>Authorities:</strong>
        <ul>
          <li v-for="(role, index) in currentPengguna.roles" :key="index">
            {{ role }}
          </li>
        </ul>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    currentPengguna() {
      return this.$store.state.auth.pengguna;
    },
  },
  mounted() {
    if (!this.currentPengguna) {
      this.$router.push("/masuk");
    }
  },
};
</script>

<style>
</style>
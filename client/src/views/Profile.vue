<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{penggunaSekarang.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{penggunaSekarang.accessToken.substring(0, 20)}} ... {{penggunaSekarang.accessToken.substr(penggunaSekarang.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{penggunaSekarang.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{penggunaSekarang.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in penggunaSekarang.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    penggunaSekarang() {
      return this.$store.state.auth.pengguna;
    }
  },
  mounted() {
    if (!this.penggunaSekarang) {
      this.$router.push('/masuk');
    }
  }
};
</script>
<template>
    <nav class="navbar navbar-dark bg-dark">
      <div>
        <router-link class="navbar-brand mb-0 h1" to="/">BAJ E-Commerce</router-link>
        <router-link class="navbar-brand mb-0 h2" to="/my-cart" v-if="getAccesToken">My Cart</router-link>
        <router-link class="navbar-brand mb-0 h2" to="/my-history" v-if="getAccesToken">History</router-link>
      </div>
      <div>
        <router-link class="navbar-brand mb-0 h2" to="/login" v-if="!getAccesToken">Login</router-link>
        <h5 v-if="getAccesToken" class="navbar-brand mb-0 h6">
        Welcome, {{ getUser }}
        </h5>
        <button @click="toLogout1" class="btn btn-danger my-2 my-sm-0 navbar-brand mb-0 h2" type="button" v-if="getAccesToken">Logout</button>
      </div>
      <router-view/>
    </nav>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'Navbar',
  methods: {
    toLogout1() {
      console.log('proses logout');
      localStorage.clear();
      if (this.$route.name !== 'Home') {
        this.$router.push('/');
      } else {
        this.$router.push('/login');
      }
      swal.fire({
        icon: 'success',
        title: 'Logged out',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  computed: {
    getAccesToken() {
      if (localStorage.access_token) {
        return true;
      }
      return false;
    },
    getUser() {
      if (localStorage.email) {
        return localStorage.email;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar a:hover {
  background: #ddd;
  color: black;
}
</style>

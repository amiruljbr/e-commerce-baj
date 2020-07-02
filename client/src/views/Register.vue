<template>
<div>
  <Navbar/>
  <br>
  <br>
  <br>
  <div class="container text-center">
    <div class="row">
      <div class="col-3 card" style="margin: 1em auto;">
        <form  @submit.prevent="submitRegister" class="form-signup">
          <h6 class="h3 mb-3 font-weight-normal">Register</h6>
          <label for="inputEmail" class="sr-only">Email</label>
          <input v-model="email" placeholder="Enter Email" type="email" class="form-control" required>
          <label for="inputPassword" class="sr-only">Password</label>
          <input v-model="password" placeholder="Enter Password" type="password" class="form-control" minlength="6" required>
          <label for="inputPassword" class="sr-only">Password2</label>
          <input v-model="password2" placeholder="Password Confirmation" type="password" class="form-control" minlength="6" required>
          <br>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          <br>
          <p>Already have account? <router-link class="p" to="/login">Login</router-link></p>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import swal from 'sweetalert2';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Email',
  data() {
    return {
      email: '',
      password: '',
      password2: '',
    };
  },
  methods: {
    submitRegister() {
      if (this.password !== this.password2) {
        swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Password dont match',
        });
        this.password = '';
        this.password2 = '';
      } else {
        this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
  components: {
    Navbar,
  },
};
</script>

<style scoped>
</style>

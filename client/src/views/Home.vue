<template>
  <section>
    <Navbar/>
    <div class="container" >
      <br>
      <br>
      <br>
      <Dasboard/>
    </div>
  </section>
</template>

<script>
import Dasboard from '../components/Dashboard.vue';
import Navbar from '../components/Navbar.vue';
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      showModal: false,
      inputName: null,
      inputImage: null,
      inputPrice: null,
      inputStock: null,
    };
  },
  computed: {
  },
  methods: {
    submitAddProduct() {
      console.log('proses add product');
      const payload = {
        name: this.inputName,
        image_url: this.inputImage,
        price: this.inputPrice,
        stock: this.inputStock,
      };
      this.$store.dispatch('createProduct', payload);
      this.showModal = false;
      this.inputName = null;
      this.inputImage = null;
      this.inputPrice = null;
      this.inputStock = null;
    },
  },
  components: {
    Navbar, Dasboard,
  },
};
</script>

<style>
</style>

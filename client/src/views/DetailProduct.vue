<template>
  <section>
    <Navbar></Navbar>
    <br>
    <br>
    <br>
    <div class="container">
      <ProductDetail></ProductDetail>
    </div>
  </section>
</template>

<script>
import ProductDetail from '../components/ProductDetail.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'DetailProduct',
  components: {
    ProductDetail, Navbar,
  },
};
</script>

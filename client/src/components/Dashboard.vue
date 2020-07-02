<template>
  <div>
    <div class="row d-flex justify-content-center">
      <ProductCard v-for="product in $store.state.products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'Dashboard',
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('getProducts');
  },
  components: {
    ProductCard,
  },
};
</script>

<style>

</style>

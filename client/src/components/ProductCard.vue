<template>
  <div v-if="product.stock>0" class="cardProduct btn card mt-3 mb-3 ml-3 mr-3 border-secondary" style="width: 18rem;" @click="toDetail">
    <img class="card-img-top" v-bind:src="product.image_url" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">{{product.name}}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Price: Rp {{product.price}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  data() {
    return {};
  },
  props: ['product'],
  computed: {},
  methods: {
    toDetail() {
      this.$router.push({ path: `/products/${this.product.id}` });
    },
  },
};
</script>

<style>
.cardProduct:hover {
  background: #ddd;
  color: black;
}
</style>

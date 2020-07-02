<template>
  <div>
    <div class="container row justify-content-md-center">
      <div class="card" style="width: 30rem;">
        <img class="card-img-top" v-bind:src="product.image_url" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price: {{product.price}}</li>
          <li class="list-group-item">Stock: {{product.stock}}</li>
        </ul>
        <div class="card-body">
          <form action="POST" @submit.prevent="addToCart">
          <input required class="form-control" v-model="qty" type="number" min="1" :max="product.stock">
          <button type="submit" class="button btn-primary m-2" >
            Add To Cart
          </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  computed: {
  },
  created() {
    this.$store.dispatch('getOneProduct', this.$route.params.id)
      .then((response) => {
        this.product = response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  components: {
  },
  methods: {
    addToCart() {
      console.log('proses add cart');
      if (localStorage.access_token) {
        const payload = {
          qty: this.qty,
          ProductId: this.product.id,
          total: this.qty * this.product.price,
        };
        this.$store.dispatch('createCart', payload);
        this.$router.push('/my-cart');
      } else {
        swal.fire({
          icon: 'warning',
          title: 'Please Login to Add Cart',
          showConfirmButton: true,
          timer: 1500,
        });
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style>

</style>

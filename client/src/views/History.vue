<template>
  <div>
    <Navbar></Navbar>
    <br>
    <br>
    <br>
    <div class="container mb-4" v-if="cart.length !== 0">
      <div class="row">
        <div class="col-12">
          <div class="table-responsive">
            <h3>Your Shopping History</h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price/item</th>
                  <th class="text-left">Total Price</th>
                  <th colspan="3">Checkout Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in cart" :key="product.id">
                  <td>
                    <img :src="product.Product.image_url" style="height: 50px; witdh:50px;" />
                  </td>
                  <td>{{ product.Product.name }}</td>
                  <td>{{ product.qty }} item</td>
                  <td class="text-left">Rp. {{ product.Product.price }}</td>
                  <td class="text-left">Rp. {{ product.qty*product.Product.price }}</td>
                  <td>
                    {{ new Date(product.checkout_date).toString().substr(0, 21) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="container mb-4" v-else id="emptyCart">
      <div class="alert alert-warning">
        <p>History Empty</p>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  data() {
    return {};
  },
  computed: {
    cart() {
      return this.$store.state.cartHistory;
    },
    grandTotal() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i += 1) {
        total += this.cart[i].qty * this.cart[i].Product.price;
      }
      return total;
    },
  },
  components: {
    Navbar,
  },
  methods: {
  },
  created() {
    this.$store.dispatch('getCartHistory');
  },
};
</script>

<style scoped>
.button {
  margin-top: 15px;
}
#cart {
  min-height: 75vh;
}
#emptyCart {
  height: 70vh;
}
</style>

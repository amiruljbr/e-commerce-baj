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
            <h3>Your Shopping Cart</h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price/item</th>
                  <th class="text-left">Total Price</th>
                  <th colspan="3">Action</th>
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
                    <button
                      class="btn btn-sm btn-danger"
                      type="button"
                      @click="deleteProductCart(product.id)" v-if="product.qty<=product.Product.stock"
                    >Delete</button>
                    <button
                      class="btn btn-lg btn-danger"
                      type="button"
                      @click="deleteProductCart(product.id)" v-if="product.qty>product.Product.stock"
                    >Product Out of Stock/Stock Change click to Delete</button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-right">Sub-Total</td>
                  <td class="text-left">Rp. {{ grandTotal }}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-right">Shipment Vendor</td>
                  <td class="text-left">SiGesit</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-right">Shipping Price (Promo)</td>
                  <td class="text-left">Rp. 0</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-right">
                    <strong>Grand Total</strong>
                  </td>
                  <td class="text-left">
                    <strong>Rp. {{ grandTotal }}</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col mb-2">
        <div class="row">
          <div class="col-sm-12 col-md-6 button">
            <button class="btn btn-lg btn-block btn-info" @click="toShopping">Continue Shopping</button>
          </div>
          <div class="col-sm-12 col-md-6 button">
            <button class="btn btn-lg btn-block btn-success" @click="toPay">Pay</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mb-4" v-else id="emptyCart">
      <div class="alert alert-warning">
        <p>Cart Empty</p>
      </div>
      <button class="btn btn-primary btn-ld" type="button" @click="toShopping">Go Shopping</button>
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
      return this.$store.state.cart;
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
    deleteProductCart(orderId) {
      this.$store.dispatch('deleteProductCart', orderId);
    },
    toPay() {
      this.$store.dispatch('checkoutProductCart');
    },
    toShopping() {
      this.$router.push('/');
    },
  },
  created() {
    this.$store.dispatch('getCart');
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

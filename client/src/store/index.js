import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import swal from 'sweetalert2';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productDetail: null,
    cart: [],
    cartHistory: [],
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload;
    },
    SET_DETAIL(state, payload) {
      state.productDetail = payload;
    },
    SET_CART(state, payload) {
      state.cart = payload;
    },
    SET_CARTHISTORY(state, payload) {
      state.cartHistory = payload;
    },
  },
  actions: {
    getProducts({ commit }) {
      Axios({
        method: 'GET',
        url: 'https://sabacomputer.herokuapp.com/customer-products',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          commit('SET_PRODUCT', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCart({ commit }) {
      Axios({
        method: 'GET',
        url: 'https://sabacomputer.herokuapp.com/orders/order',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          commit('SET_CART', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCartHistory({ commit }) {
      Axios({
        method: 'GET',
        url: 'https://sabacomputer.herokuapp.com/orders/paid',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          commit('SET_CARTHISTORY', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneProduct(context, productId) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'GET',
          url: `https://sabacomputer.herokuapp.com/customer-products/${productId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createCart(context, payload) {
      Axios({
        method: 'POST',
        url: 'https://sabacomputer.herokuapp.com/orders',
        headers: {
          access_token: localStorage.access_token,
        },
        data: payload,
      })
        .then(() => {
          console.log('add cart sukses');
          context.dispatch('getCart');
          swal.fire({
            icon: 'success',
            title: 'Success Add Product to Cart',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProductCart(context, orderId) {
      Axios({
        method: 'DELETE',
        url: `https://sabacomputer.herokuapp.com/orders/${orderId}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response.data);
          context.dispatch('getCart');
          swal.fire({
            icon: 'warning',
            title: 'Product Deleted from Cart',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkoutProductCart(context) {
      Axios({
        method: 'PUT',
        url: 'https://sabacomputer.herokuapp.com/orders/check-out',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response.data);
          swal.fire({
            icon: 'success',
            title: 'Payment Success',
            showConfirmButton: false,
            timer: 1500,
          });
          context.dispatch('getCart');
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    register(context, payload) {
      Axios({
        method: 'POST',
        url: 'https://sabacomputer.herokuapp.com/register',
        data: payload,
      })
        .then(() => {
          swal.fire({
            icon: 'success',
            title: 'Register Success, Please Sign In',
            showConfirmButton: true,
            timer: 1500,
          });
          router.push('/login');
        })
        .catch((err) => {
          console.log(err);
          console.log('tidak jalan');
          swal.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    submitLogin(context, payload) {
      Axios({
        method: 'POST',
        url: 'https://sabacomputer.herokuapp.com/login',
        data: payload,
      })
        .then((response) => {
          swal.fire({
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('email', response.data.email);
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
          console.log('tidak jalan');
          swal.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
  },
  modules: {
  },
});

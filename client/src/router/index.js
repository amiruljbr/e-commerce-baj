import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Cart from '../views/Cart.vue';
import History from '../views/History.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DetailProduct from '../views/DetailProduct.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/my-cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/my-history',
    name: 'History',
    component: History,
  },
  {
    path: '/products/:id',
    name: 'DetailProduct',
    component: DetailProduct,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.path === '/my-cart' || to.path === '/my-history') && !localStorage.access_token) {
    next({ name: 'Login' });
  } else if ((to.path === '/login' || to.path === '/register') && localStorage.access_token) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;

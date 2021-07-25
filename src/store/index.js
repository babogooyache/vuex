import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    products: [],
    categories: [],
  },
  actions: {
    // payload 載荷
    updateLoading(context, status) {
      context.commit('LOADING', status);
    },
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      // vm.$store.dispatch('updateLoading', true);
      context.commit('LOADING', true);
      axios.get(url).then((response) => {
        context.commit('PRODUCTS', response.data.products);
        context.commit('CATEGORIES', response.data.products);
        console.log('取得產品列表:', response);
        context.commit('LOADING', false);
      });
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    // 會儲存遠端資料
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    // 會將遠端資料，唯一分類取得唯一值後，存在category
    // CATEGORIES 是複製 Home.vue 裡面 getUnique() 的程式碼
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
  },
});

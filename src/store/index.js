import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // data that we want to share across components must be inside here
    customers: [
      // {
      //   id: 1,
      //   username: "Bob",
      //   email: "bob@bobsburgers.com"
      // },
      // {
      //   id: 2,
      //   username: "Tina",
      //   email: "tina@bobsburgers.com"
      // },
      // {
      //   id: 3,
      //   username: "Eugene",
      //   email: "eugene@bobsburgers.com"
      // }
    ],
    product:[]
  },
  getters: {
    customers: function (state) {
      return state.customers;
    },
    getCustomerById: function (state, userId) {
      return state.customers.find(function (eachCustomer) {
        return eachCustomer.id === userId;
      });
    }
  },
  mutations: {
    addNewCustomer: function (state, newCustomer) {
      state.customers.push({
        id: Math.floor(Math.random() * 10000) + 1,
        username: newCustomer.username
      });
    },
    addProductId: function (state, productId) {
      state.product.push({
        // id: Math.floor(Math.random() * 10000) + 1,
        productId: productId
      });
    }
  }
});

export default store;

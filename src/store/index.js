import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // data that we want to share across components must be inside here
    customers: [
      {
        id: 1,
        name: "Bob",
        email: "bob@bobsburgers.com"
      },
      {
        id: 2,
        name: "Tina",
        email: "tina@bobsburgers.com"
      },
      {
        id: 3,
        name: "Eugene",
        email: "eugene@bobsburgers.com"
      }
    ]
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
        name: newCustomer.name,
        email: newCustomer.email
      });
    }
  }
});

export default store;

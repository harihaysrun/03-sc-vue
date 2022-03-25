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
    product:[],
    profile: [],
    address:[]
  },
  getters: {
    customers: function (state) {
      return state.customers;
    },
    getCustomerById: function (state, userId) {
      return state.customers.find(function (eachCustomer) {
        return eachCustomer.id === userId;
      });
    },
    getProfile: function (state) {
      return state.profile;
    },
    getAddress: function (state) {
      return state.address;
    },
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
    },
    saveProfile: function(state, profile){
      state.profile.push({
        'username': profile.username,
        'email': profile.email,
        'first_name': profile.first_name,
        'last_name': profile.last_name
      })
    },
    updateProfile: function(state, profile){
      state.profile[0] = profile;
    },
    saveAddress: function(state, profile){
      state.address.push({
        'address_line_1': profile.address_line_1,
        'address_line_2': profile.address_line_2,
        'postal_code': profile.postal_code,
        'phone_number': profile.phone_number,
        'password': profile.password
      })
    },
    updateAddress: function(state, address){
      state.address[0] = address;
    }
  }
});

export default store;

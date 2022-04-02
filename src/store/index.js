import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // data that we want to share across components must be inside here
    product:[],
    profile: [],
    address:[],
    cart:'',
    products: [
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
  },
  getters: {
    getProfile: function (state) {
      return state.profile;
    },
    getAddress: function (state) {
      return state.address;
    },
    getCartLength: function (state) {
      return state.cart;
    },
  },
  mutations: {
    addProductId: function (state, productId) {
      state.product.push({
        // id: Math.floor(Math.random() * 10000) + 1,
        productId: productId
      });
    },
    addProducts: function (state, productInfo) {
      state.products.push({
        'productId': productInfo.id,
        'stockNo': productInfo.stockNo
      });
    },
    emptyProducts: function (state, empty) {
      state.products = empty;
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
        'country': profile.country,
        'postal_code': profile.postal_code,
        'phone_number': profile.phone_number
      })
    },
    updateAddress: function(state, address){
      state.address[0] = address;
    },
    updateCartLength: function(state, noOfItems){
      state.cart = noOfItems;
    }
  }
});

export default store;

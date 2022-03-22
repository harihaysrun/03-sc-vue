<template>
    <div>
        <h1>Your Cart</h1>
        
        <div class="card" style="width: 18rem;" v-for="item in cartItems" v-bind:key="item.id">
          <img v-bind:src="item.product.image_url" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ item.product.name }}</h5>
            <ul>
              <li class="card-text">Price: ${{ item.product.cost }}</li>
              <li class="card-text">Quantity: {{ item.quantity }}</li>
            </ul>
            <!-- <a href="#" class="btn btn-primary" v-on:click="addToCart(p.id)">Add to cart</a> -->
          </div>
        </div>
        
    </div>
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Cart',
  created: async function(){

    this.user_id = localStorage.getItem("user_id"); 
    let response = await axios.post(BASE_API_URL + 'cart/', {
              'user_id': this.user_id
            });
    // console.log(response.data)

    this.cartItems = response.data.cartItems;

  },
  data: function(){
    return{
      'cartItems': [],
      'accessToken': '',
      'user_id':''
    }
  },
  methods:{
    viewThisProduct: function(productId){
      // this.$emit('view-product', productId);
      // this.$store.commit("addProductId", productId);
      // console.log(productId)
      // console.log(this.$store.state.product)

      localStorage.setItem("product_id", productId);

      this.$router.push({ path: `/products/${productId}`}); // set current route
    },
    addToCart: async function(productId){
      if(this.accessToken){
        console.log("user is logged in")

        this.user_id = localStorage.getItem("user_id"); 
        console.log(this.user_id)
        
        // let response = await axios.post(BASE_API_URL + productId + '/add',{
        //   'user_id': this.user_id
        // });
        let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/add', {
          'user_id': this.user_id
        });

        // let response = await axios.post( BASE_API_URL + 'cart/' + productId + '/add', {
        //                                   headers: {"Authorization" : `Bearer ${this.accessToken}`}
        //                                 });
        

        console.log("getted")
        
        // this.products = response.data.reverse();
        console.log(response.data)
      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    }
  }
}
</script>
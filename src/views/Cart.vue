<template>
    <div>
        <h1>Your Cart</h1>
        
        <div class="card" style="width: 18rem;" v-for="item in cartItems" v-bind:key="item.id">
          <img v-bind:src="item.product.image_url" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ item.product.name }}</h5>
            <ul>
              <li class="card-text">Price: ${{ item.product.cost }}</li>
            </ul>
            <p class="card-text">
              Quantity: <input type="text" v-model="item.quantity">
              <a href="#" class="btn btn-primary" v-on:click="updateQuantity(item.product.stock_no, item.id, item.quantity)">Update</a>
            </p>
            <!-- <a href="#" class="btn btn-primary" v-on:click="addToCart(p.id)">Add to cart</a> -->
          </div>

          {{item.quantity}}
        </div>
        
    </div>
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Cart',
  created: async function(){
    this.accessToken = localStorage.getItem("access_token");
    // console.log(this.accessToken)

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
      'user_id':'',
    }
  },
  methods:{
    updateQuantity: async function(stockNo, productId, newQuantity){
      if(this.accessToken){

        // let stockNo = localStorage.getItem("stock_no"); 
        console.log(Number.isInteger(newQuantity))

        let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/update', {
          'user_id': this.user_id,
          'quantity': stockNo,
          'newQuantity': newQuantity
        });
        console.log(response);

        // console.log('this.user_id: ' + this.user_id)
        // console.log('productId: ' + productId)
        // console.log('newQuantity: ' + newQuantity)
        

      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    },
    addToCart: async function(productId){
      if(this.accessToken){
        this.user_id = localStorage.getItem("user_id"); 
        let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/add', {
          'user_id': this.user_id
        });
        console.log(response.data)
      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    }
  }
}
</script>
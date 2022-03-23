<template>
    <div>
        <h1>Your Cart</h1>


        <div v-if="updateMessage">
          <div class="alert alert-success" role="alert">
            Quantity for {{itemName}} has been updated
          </div>
        </div>
        <div v-if="deleteMessage">
          <div class="alert alert-danger" role="alert">
            {{itemName}} has been removed from your cart
          </div>
        </div>
        <div v-if="warningMessage">
          <div class="alert alert-warning" role="alert">
            Only {{stockNo}} left in stock for {{itemName}}
          </div>
        </div>
        
        <div class="card" style="width: 18rem;" v-for="item in cartItems" v-bind:key="item.id">
          <img v-bind:src="item.product.image_url" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ item.product.name }}</h5>
            <ul>
              <li class="card-text">Price: ${{ item.product.cost }}</li>
            </ul>
            <p class="card-text">
              Left in stock: {{item.product.stock_no}}
              <br>
              Quantity: <input type="text" v-model="item.quantity">
              <a href="#" class="btn btn-primary" v-on:click="updateQuantity(item.product.stock_no, item.product_id, item.quantity, item.product.name)">Update</a>
              <a href="#" class="btn btn-danger" v-on:click="removeItem(item.product_id, item.product.name)">Remove</a>
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
      'updateMessage':'',
      'deleteMessage':'',
      'warningMessage':'',
      'itemName':'',
      'stockNo':''
    }
  },
  methods:{
    updateQuantity: async function(stockNo, productId, newQuantity, itemName){
      if(this.accessToken){

        newQuantity = parseInt(newQuantity);

        let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/update', {
          'user_id': this.user_id,
          'quantity': stockNo,
          'newQuantity': newQuantity
        });
        console.log(response);

        // let refreshResponse = await axios.post(BASE_API_URL + 'cart/', {
        //           'user_id': this.user_id
        //         });

        // this.cartItems = refreshResponse.data.cartItems;

        this.deleteMessage = "";
        this.warningMessage = "";
        this.itemName = itemName;
        this.updateMessage = `Quantity for ${this.itemName} has been updated`;
        
        if (response.data.stock === "not enough"){
          
          this.deleteMessage = "";
          this.updateMessage = "";
          this.stockNo = stockNo;
          this.warningMessage = `Only ${this.stockNo} in stock for ${this.itemName}`;
        }
        // window.location.reload();

      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    },
    removeItem: async function(productId, itemName){
      if(this.accessToken){

        let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/remove', {
          'user_id': this.user_id
        });
        
        console.log(response);

        let refreshResponse = await axios.post(BASE_API_URL + 'cart/', {
                  'user_id': this.user_id
                });

        this.cartItems = refreshResponse.data.cartItems;

        this.updateMessage = "";
        this.warningMessage = "";
        this.itemName = itemName;
        this.deleteMessage = `${this.itemName} has been removed from cart}`;

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
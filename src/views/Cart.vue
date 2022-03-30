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

        <p v-if="emptyCart === 'yes'">
          Your cart is empty
        </p>
        
        <div v-else>

          <div class="d-flex flex-row">

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
                  <a class="btn btn-primary" v-on:click="updateQuantity(item.product.stock_no, item.product_id, item.quantity, item.product.name)">Update</a>
                  <a class="btn btn-danger" v-on:click="removeItem(item.product_id, item.product.name)">Remove</a>
                </p>
              </div>

              {{item.quantity}}
            </div>
          </div>

          <a class="btn btn-success" v-on:click="checkout">Checkout</a>

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

    if (this.cartItems.length === 0){
      this.emptyCart = "yes";
    } else{
      this.emptyCart = "no"
    }

  },
  data: function(){
    return{
      'emptyCart':'',
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

        let cartResponse = await axios.post(BASE_API_URL + 'cart', {
          'user_id': this.user_id
        })

        let cartItems = cartResponse.data.cartItems;
        let updatedQuantity = 0;

        for (let i=0; i<cartItems.length; i++){
          console.log(cartItems[i].quantity)
          updatedQuantity += cartItems[i].quantity;
        }

        this.$store.commit("updateCartLength", updatedQuantity);
        this.$emit("cart", this.$store.getters.getCartLength)


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


        let cartResponse = await axios.post(BASE_API_URL + 'cart', {
          'user_id': this.user_id
        })

        let cartItems = cartResponse.data.cartItems;
        let updatedQuantity = 0;

        for (let i=0; i<cartItems.length; i++){
          console.log(cartItems[i].quantity)
          updatedQuantity += cartItems[i].quantity;
        }

        this.$store.commit("updateCartLength", updatedQuantity);
        this.$emit("cart", this.$store.getters.getCartLength)


        this.updateMessage = "";
        this.warningMessage = "";
        this.itemName = itemName;
        this.deleteMessage = `${this.itemName} has been removed from cart}`;

      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    },
    checkout: async function(){
      if(this.accessToken){
        this.user_id = localStorage.getItem("user_id"); 
        let response = await axios.post(BASE_API_URL + 'checkout', {
          'user_id': this.user_id
        });

        // let response = await axios.get(BASE_API_URL + 'checkout');
        console.log(response.data)

        let stripeSession = response.data.url;

        console.log(stripeSession)

        window.location.href = response.data.url;

        // this.$router.push("/checkout");
      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/cart"
      }
    }
  }
}
</script>
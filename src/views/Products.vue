<template>
    <div>
        <h1>Products</h1>
        
        <div class="card" style="width: 18rem;" v-for="p in products" v-bind:key="p.id">
          <img v-bind:src="p.image_url" class="card-img-top" alt="...">
          <div class="card-body">
            <a class="card-title" v-on:click="viewThisProduct(p.id)">
              <h5>{{ p.name }}</h5>
            </a>
            <p class="card-text">${{ p.cost }}</p>
            <a href="#" class="btn btn-primary" v-on:click="addToCart(p.id)">Add to cart</a>
          </div>
        </div>
        
    </div>
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Products',
  created: async function(){

      // localStorage.setItem("product_id", "");

    this.accessToken = localStorage.getItem("access_token");
    console.log(this.accessToken)

    let response = await axios.get(BASE_API_URL + 'products');
    this.products = response.data.reverse();
    console.log(this.products)
  },
  data: function(){
    return{
      'products': [],
      'accessToken': 'yes',
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
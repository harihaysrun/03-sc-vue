<template>
    <div>

      <div v-if="dangerMessage">
        <div class="alert alert-danger" role="alert">
          0 left in stock
        </div>
      </div>

        <h1>Products</h1>
        
        <div class="card" style="width: 18rem;" v-for="p in products" v-bind:key="p.id">
          <img v-bind:src="p.image_url" class="card-img-top" alt="...">
          <div class="card-body">
            <a class="card-title" v-on:click="viewThisProduct(p.id)">
              <h5>{{ p.name }}</h5>
            </a>
            <p class="card-text">{{p.status.name}} {{ p.stock_no }}</p>
            <p class="card-text">${{ p.cost }}</p>
            <a class="btn btn-primary" v-on:click="addToCart(p.id, p.stock_no)" v-if="p.status_id != 2">Add to cart</a>
            <a class="btn btn-danger" v-else>Out of stock</a>
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

    this.dangerMessage = false;

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
      'user_id':'',
      'dangerMessage':false
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
    addToCart: async function(productId, stockNo){
      if(this.accessToken){
        console.log("user is logged in")

        // localStorage.setItem("stock_no", stockNo); 
        this.user_id = localStorage.getItem("user_id"); 
        console.log(this.user_id)
        
        // let response = await axios.post(BASE_API_URL + productId + '/add',{
        //   'user_id': this.user_id
        // });

        if (stockNo != 0){
          let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/add', {
            'user_id': this.user_id
          });
          console.log("added to cart")
          console.log(response.data)
        } else{
          console.log("0 in stock")
          this.dangerMessage = true;
        }


      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    }
  }
}
</script>
<template>
    <div>
        <h1>Product Info</h1>

        {{brand}}
        {{name}}
        {{country}}
        {{type}}
        {{cost}}
        {{description}}
      
        <ul>
          <li v-for="type in skin_types" v-bind:key="type.id">
            {{type.name}}
          </li>
        </ul>

        {{ingredients}}
        {{expiry}}
        {{status}}
        {{stock}}
        <br>
        <img v-bind:src="image_url" alt="">
        
    </div>
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Products',
  created: async function(){

    let productId = localStorage.getItem("product_id");
    console.log("productId: " + productId);

    let response = await axios.get(BASE_API_URL + 'products/' + productId);
    // console.log(response.data.product)

    let product = response.data.product;
    this.brand = product.brand.name;
    this.name = product.name;
    this.country = product.country.name;
    this.type = product.type.name;
    this.cost = product.cost;
    this.description = product.description;
    this.skin_types = product.skinTypes;
    this.ingredients = product.ingredients;
    this.expiry = product.expiry;
    this.status = product.status.name;
    this.stock = product.stock_no;
    this.image_url = product.image_url;

    
    document.title = this.product_brand + ' ' + this.product_name;
  },
  data: function(){
    return{
      'brand': '',
      'name': '',
      'country': '',
      'type': '',
      'cost': '',
      'description': '',
      'skin_types': [],
      'ingredients': '',
      'expiry': '',
      'status': '',
      'stock': '',
      'image_url': '',
    }
  },
  // props:[
  //   'productId'
  // ],
  methods:{
    viewThisProduct: function(productId){
      // this.$emit('view-product', productId);
      this.$store.commit("addProductId", productId);
      console.log(productId)
      console.log(this.$store.state.product)
    }
  }
}
</script>
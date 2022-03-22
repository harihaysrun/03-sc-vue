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
            <a href="#" class="btn btn-primary">Add to cart</a>
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
    let response = await axios.get(BASE_API_URL + 'products');
    this.products = response.data.reverse();
    console.log(this.products)
  },
  data: function(){
    return{
      'products': []
    }
  },
  methods:{
    viewThisProduct: function(productId){
      // this.$emit('view-product', productId);
      // this.$store.commit("addProductId", productId);
      // console.log(productId)
      // console.log(this.$store.state.product)

      // this.$router.push({ path: `/products/${productId}`,  replace: true });

      this.$router.push({ name: 'ProductInfo', params:{ productId } });
    }
  }
}
</script>
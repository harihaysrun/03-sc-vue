<template>
    <div>

        <ProductsList v-if="tab === 'products'" v-on:view-product="viewThisProduct"/>
        <ProductInfo v-if="tab === 'productInfo'" v-bind:productId="productId"/>
        
    </div>
</template>

<script>

import ProductsList from "@/components/products-list";
import ProductInfo from "@/components/product-info";
// import axios from 'axios';
// const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'ProductInfo',
  components:{
    ProductsList,
    ProductInfo
  },
  // created: async function(){
  //   let response = await axios.get(BASE_API_URL + 'products');
  //   this.products = response.data.reverse();
  //   console.log(this.products)
  // },
  data: function(){
    return{
      'products': [],
      'tab': 'products'
    }
  },
  methods:{
    viewThisProduct: function(productId){
      this.tab = "productInfo";
      this.productId = productId;
      // this.$emit('view-product', productId);
      // this.$store.commit("addProductId", productId);
      // console.log(productId)
      // console.log(this.$store.state.product)
      // this.$router.push({ path: `/products/${productId}`});
    }
  }
}
</script>
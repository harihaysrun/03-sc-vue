<template>
    <div>
        Products
        <ul>
              <li v-for="p in products" v-bind:key="p.id">
                {{ p.name }}
                ${{ p.cost }}
              </li>
            </ul>
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
}
</script>
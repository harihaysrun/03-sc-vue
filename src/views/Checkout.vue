<template>
  <div>
    
    <h1 class="text-center m-0 mt-5">Your order has been successfully placed</h1>

    <div class="d-flex flex-column align-items-center mt-5">

      
      <div class="card w-75 text-center p-2">  
        <h2 class="m-0">Order #{{order.id}}</h2>
      </div>

      <div class="card w-75 d-flex flex-row align-items-center p-5" v-for="item in orderItems" v-bind:key="item.id">
        <img v-bind:src="item.image_url" class="card-img-top w-25" alt="...">

        <div class="card-body p-0">
          <h5 class="card-title">{{item.product_brand}} {{ item.product_name }}</h5>
        </div>
        <div class="card-body p-0" style="text-align:right !important;">
          <!-- <p class="card-text"> -->
            Cost: ${{item.total_cost}}
            <br>
            Quantity: {{item.quantity}}
            <br>
          <!-- </p> -->
        </div>
      </div>

      <div class="card w-75 d-flex flex-row justify-content-between p-5">  
        <span>Grand total</span>
        <span>Grand total ${{order.amount}}</span>
      </div>
    </div>
    

  </div>
</template>


<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Checkout',
  mounted: async function(){

    this.user_id = localStorage.getItem("user_id"); 

    console.log(this.$route.params.id)
    let response = await axios.post(BASE_API_URL + 'checkout/success/' + this.$route.params.id, {
      'user_id': this.user_id
    });
    console.log(response.data)

    this.orderItems = response.data.orderItems;
    this.order = response.data.order;
  },
  data: function(){
    return{
      'orderItems':[],
      'order':[]
    }
  }
}

</script>

<template>
    <div>
      <h1>Orders</h1>

      <span v-if="haveOrders === 'no'">
        No orders found
      </span>

      <table class="table" v-else>
        <thead>
          <tr>
            <th>Order No.</th>
            <th>Date</th>
            <th>Items</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Shipping Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in orders" v-bind:key="o.id">
            <td>{{o.id}}</td>
            <td>{{o.date}}</td>
            <td>{{o.items_text}}</td>
            <td>{{o.amount}}</td>
            <td>{{o.payment_status}}</td>
            <td>{{o.shipping.name}}</td>
          </tr>
        </tbody>
      </table>

    </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";


export default{
  name: 'ProfileTab',
  mounted: async function(){

    this.user_id = localStorage.getItem("user_id"); 
    let response = await axios.post(BASE_API_URL + 'orders',{
      'user_id': this.user_id
    });

    console.log(response.data.length)
    this.orders = response.data.reverse();

    if(response.data.length === 0){
      this.haveOrders = "no";
    }

  },
  data: function(){
    return{
      'orders': [],
      'haveOrders': ''
    }
  }
}
</script>

<style scoped>
small{
  opacity:0.5;
}
</style>
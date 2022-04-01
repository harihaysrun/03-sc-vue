<template>
    <div>

      <span v-if="!haveOrders">
        No orders found
      </span>

      <div v-else>

        <div class="alert alert-primary d-flex flex-row justify-content-between align-items-center" role="alert">
          Please contact us to cancel any orders.
        </div>

        <table class="table d-block d-lg-none">
          <thead>
            <tr>
              <th>Order</th>
              <th>Items & Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in orders" v-bind:key="o.id">
              <td class="align-middle">
                <b>#{{o.id}}</b>
                <br>{{o.date}}
                </td>
              <td class="align-middle">
                {{o.items_text}}
                <br>
                ${{o.amount}} <span class="text-capitalize">{{o.payment_status}}</span>
              </td>
              <td class="align-middle">{{o.shipping.name}}</td>
            </tr>
          </tbody>
        </table>

        <table class="table d-none d-lg-block">
          <thead>
            <tr>
              <th class="p-4">Order</th>
              <th class="p-4">Date</th>
              <th class="p-4">Items</th>
              <th class="p-4">Amount</th>
              <th class="p-4">Payment</th>
              <th class="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in orders" v-bind:key="o.id">
              <td class="p-4"><b>#{{o.id}}</b></td>
              <td class="p-4">{{o.date}}</td>
              <td class="p-4">{{o.items_text}}</td>
              <td class="p-4">${{o.amount}}</td>
              <td class="p-4">{{o.payment_status}}</td>
              <td class="p-4">{{o.shipping.name}}</td>
            </tr>
          </tbody>
        </table>
      </div>

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
      this.haveOrders = false;
    }

    this.haveOrders = true;

  },
  data: function(){
    return{
      'orders': [],
      'haveOrders': false
    }
  }
}
</script>

<style scoped>
small{
  opacity:0.5;
}

thead{
  color:#1050ff;
  border-bottom:2px solid #1050ff;
}

</style>
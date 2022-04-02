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
              <td class="align-middle">
                {{o.shipping.name}}
                <p v-if="o.tracking" class="mt-1">
                  <a v-bind:href="o.tracking" target="_blank" class="yellow p-1">
                      <!-- <small> -->
                        <i class="fa-solid fa-truck-fast me-1" style="font-size:15px;"></i>
                        Tracking
                      <!-- </small> -->
                  </a>
                </p>
              </td>
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
              <th class="p-4">Tracking</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in orders" v-bind:key="o.id">
              <td class="p-4 align-middle"><b>#{{o.id}}</b></td>
              <td class="p-4 align-middle">{{o.date}}</td>
              <td class="p-4 align-middle">{{o.items_text}}</td>
              <td class="p-4 align-middle">${{o.amount}}</td>
              <td class="p-4 align-middle">{{o.payment_status}}</td>
              <td class="p-4 align-middle">{{o.shipping.name}}</td>
              <!-- <td class="p-4"><i class="fa-solid fa-truck-fast"></i></td> -->
              <td class="p-4 align-middle text-center" v-if="o.tracking">
                  <a v-bind:href="o.tracking" target="_blank" class="icon-btns yellow edit-btn d-flex flex-column align-items-center">
                      <i class="fa-solid fa-truck-fast"></i>
                      Tracking
                  </a>
              </td>
              <td class="p-4 align-middle" v-else></td>
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
    this.orders = response.data;

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

.icon-btns{
  padding:10px;
  border-radius:15px;
  font-size:12px;
}    

.icon-btns i{
  font-size:15px;
  margin-bottom:5px;
  background-color:#e0c00b;
  color:white;
  padding:10px 8px;
  border-radius:50%;
}

.yellow{
  color:#e0c00b !important;
}

.yellow:hover{
  background-color:rgb(255, 223, 41, 0.3) !important;
}

</style>
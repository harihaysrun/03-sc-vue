<template>
    <div>

      <div v-if="updateMessage">
        <div class="alert alert-success" role="alert">
          Successfully updated your profile
        </div>
      </div>

      <div v-if="view === 'private'">
        Please log in
      </div>

      <div v-else-if="view === 'loggedin'">
        <h1>Hi, {{username}}!</h1>

        <p class="mt-5">
          <a class="btn btn-primary" v-if="tab === 'profile'">Profile</a>
          <a class="btn" v-else v-on:click="viewProfile">Profile</a>
          <a class="btn btn-primary" v-if="tab === 'address'">Address Book</a>
          <a class="btn" v-else v-on:click="viewAddress">Address Book</a>
          <a class="btn btn-primary" v-if="tab === 'orders'">Orders</a>
          <a class="btn" v-else v-on:click="viewOrders">Orders</a>
        </p>

        <ProfileTab class="mb-5" v-if="tab === 'profile'" />
        <AddressBook class="mb-5" v-if="tab === 'address'" />
        <OrdersTab class="mb-5" v-if="tab === 'orders'" />
      </div>

    </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

import ProfileTab from "@/components/Profile-Tab";
import AddressBook from "@/components/Address-Tab";
import OrdersTab from "@/components/Orders-Tab";

export default{
  name: 'Profile',
  mounted: async function(){
    
    let response = await axios.get(BASE_API_URL + 'products');
    this.products = response.data.reverse();

  },
  components:{
    ProfileTab, AddressBook, OrdersTab
  },
  data: function(){
    return{
      'username': '',
      'user': [],
      'tab':'profile',
      'view':'private',
      'updateMessage': ''
    }
  },
  methods:{
    viewProfile: function(){
      this.tab = "profile"
    },
    viewAddress: function(){
      this.tab = "address"
    },
    viewOrders: function(){
      this.tab = "orders"
    }
  }
}
</script>
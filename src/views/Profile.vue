<template>
    <div>
        <h1>Hi, {{user.username}}!</h1>

        {{user.first_name}} {{user.last_name}}
        <br>
        {{user.email}}
        <br>
        {{user.address_line_1}}, {{user.address_line_2}}
        <br>
        Singapore {{user.postal_code}}
        <br>
        {{user.phone_number}}

        <p class="mt-5">
          <a class="btn btn-primary" v-if="tab === 'profile'">Profile details</a>
          <a class="btn" v-else v-on:click="viewProfile">Profile details</a>
          <a class="btn btn-primary" v-if="tab === 'address'">Address</a>
          <a class="btn" v-else v-on:click="viewAddress">Address</a>
          <a class="btn btn-primary" v-if="tab === 'orders'">Orders</a>
          <a class="btn" v-else v-on:click="viewOrders">Orders</a>
        </p>

        <ProfileTab class="mb-5" v-if="tab === 'profile'" />


    </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

import ProfileTab from "@/components/Profile-Tab";
// import ProductsList from "@/components/products-list";
// import ProductInfo from "@/components/product-info";

export default{
  name: 'Profile',
  mounted: async function(){

    let accessToken = localStorage.getItem("access_token");
    let response = await axios.get(
                                BASE_API_URL + 'users/profile',
                                { headers: {"Authorization" : `Bearer ${accessToken}`}}
                                );
    console.log(response.data.user)
    this.user = response.data.user;

    localStorage.setItem("user_id", response.data.user.id);

  },
  components:{
    ProfileTab,
  },
  data: function(){
    return{
      'user': [],
      'tab':'profile'
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
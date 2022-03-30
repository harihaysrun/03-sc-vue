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

    let accessToken = localStorage.getItem("access_token");
    let response = await axios.get(
                                BASE_API_URL + 'users/profile',
                                { headers: {"Authorization" : `Bearer ${accessToken}`}}
                                );
    // console.log(response.data.user)

    if(response.data.message === 'Forbidden'){
      this.view = "private"
      this.user = "";
    } else{

      console.log(response.data.user)
      this.view = "loggedin";
      this.user = response.data.user;

      localStorage.setItem("user_id", response.data.user.id);

      let profileUpdateSuccess = localStorage.getItem("success");

      if (profileUpdateSuccess === 'Profile Updated'){
          // localStorage.setItem("success", "Profile Updated");
          this.updateMessage = true;
          localStorage.removeItem("success");
      } else{
          this.updateMessage = '';
      }

      let user = this.user;

      let profile = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name
      };

      let address = {
        'address_line_1': user.address_line_1,
        'address_line_2': user.address_line_2,
        'country': user.country,
        'postal_code': user.postal_code,
        'phone_number': user.phone_number,
        'password': user.password
      };

      this.$store.commit("saveProfile", profile);
      this.$store.commit("saveAddress", address);

      console.log(this.$store.state.address[0])

      this.username = this.$store.state.profile[0].username;

      // get number of items in cart
      let userId = localStorage.getItem("user_id")
      console.log(userId)

      let cartResponse = await axios.post(BASE_API_URL + 'cart', {
        'user_id': userId
      })

      let cartItems = cartResponse.data.cartItems;
      let totalQuantity = 0;

      for (let i=0; i<cartItems.length; i++){
        console.log(cartItems[i].quantity)
        totalQuantity += cartItems[i].quantity;
      }

      this.$store.commit("updateCartLength", totalQuantity);
      console.log('cart length from store: ' + this.$store.getters.getCartLength)
      this.$emit("cart", this.$store.getters.getCartLength);

    }

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
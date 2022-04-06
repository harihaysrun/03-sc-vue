<template>
    <div class="mt-lg-5">

      <div v-if="updateMessage">
        <div class="alert alert-success mb-3" role="alert">
          Successfully updated your profile
        </div>
      </div>

      <div v-if="!profileLoaded">
        Retrieving profile...
      </div>

      <div v-else>
        <h1>Hi, {{username}}!</h1>

        <div class="mt-5 mb-5">
          <div class="tab-container">
            <a class="current-tab" v-if="tab === 'profile'">Profile</a>
            <a class="inactive-tab" v-else v-on:click="viewProfile">Profile</a>
            <a class="current-tab" v-if="tab === 'address'">Address Book</a>
            <a class="inactive-tab" v-else v-on:click="viewAddress">Address Book</a>
            <a class="current-tab" v-if="tab === 'orders'">Orders</a>
            <a class="inactive-tab" v-else v-on:click="viewOrders">Orders</a>
          </div>

        <ProfileTab class="mt-4 mb-5" v-if="tab === 'profile'" />
        <AddressBook class="mt-4 mb-5" v-if="tab === 'address'" />
        <OrdersTab class="mt-4 mb-5" v-if="tab === 'orders'" />

        </div>
        
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
  created: async function(){

    document.title = "Profile";

    let accessToken = localStorage.getItem("access_token");

    if(!accessToken){
      // // console.log("please log in")
      localStorage.setItem("danger_message", "Please log in");
      this.$router.push("/login")
    } else{

      let response = await axios.get(
                    BASE_API_URL + 'users/profile',
                    { headers: {"Authorization" : `Bearer ${accessToken}`}}
                  );

      this.user = response.data.user;

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

      // console.log(this.$store.state.address[0])

      this.username = this.user.username;

      // get number of items in cart
      let userId = localStorage.getItem("user_id")
      // console.log(userId)

      let cartResponse = await axios.post(BASE_API_URL + 'cart', {
        'user_id': userId
      })

      let cartItems = cartResponse.data.cartItems;
      let totalQuantity = 0;

      for (let i=0; i<cartItems.length; i++){
        // console.log(cartItems[i].quantity)
        totalQuantity += cartItems[i].quantity;
      }

      this.$store.commit("updateCartLength", totalQuantity);
      // console.log('cart length from store: ' + this.$store.getters.getCartLength)
      this.$emit("cart", this.$store.getters.getCartLength);

      this.profileLoaded = true;

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
      'profileLoaded':false,
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

<style scoped>

h1{
    color:#1050ff;
    font-weight:700;
}

.tab-container{
  border-bottom: 1px solid #e3e3e3;
  padding: 10px 0;
}

.tab-container a{
  padding: 10px 15px;
  cursor: pointer;
}

.tab-body{
  padding: 0 15px;
}

.current-tab{
  border-radius:0 !important;
  font-weight:700;
  color:#1050ff;
  border-bottom: 3px solid #1050ff;
}

.inactive-tab{
  color:gray;
}

</style>
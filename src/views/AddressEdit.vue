<template>
  <div class="container">
    <div class="row">

      <h1>Edit Address</h1>
      <div class="mt-3">
        <div class="mt-3">
          <label for="line-1" class="form-label">Address Line 1</label>
          <input class="form-control" v-model="user.address_line_1" id="line-1" />
        </div>

        <div class="mt-3">
          <label for="line-2" class="form-label">Address Line 2</label>
          <input class="form-control" v-model="user.address_line_2" id="line-2" />
        </div>

        <div class="mt-3">
          <label for="country" class="form-label">Country</label>
          <input class="form-control" v-model="user.country" id="country"/>
        </div>

        <div class="mt-3">
          <label for="postal-code" class="form-label">Postal Code</label>
          <input class="form-control" v-model="user.postal_code" id="postal-code"/>
        </div>

        <div class="mt-3">
          <label for="phone-number" class="form-label">Phone Number</label>
          <input class="form-control" v-model="user.phone_number" id="phone-number"/>
        </div>

        <div class="mt-4 mb-5 d-flex flex-column flex-md-row justify-content-md-end">
          <a class="btn btn-danger my-2 my-md-0 mx-md-2" v-on:click="backToProfile">Cancel</a>
          <a class="btn btn-success" v-on:click="updateProfile">Update</a>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";


export default{
  name: 'AddressEdit',
  mounted: async function(){

    document.title = "Edit Address";

  },
  data: function(){
    return{
      'user': JSON.parse(JSON.stringify(this.$store.state.address[0]))
    }
  },
  methods:{
    backToProfile: function(){
      this.user = JSON.parse(JSON.stringify(this.$store.state.address[0]));
      this.$router.push("/profile")
    },
    updateProfile: async function(){

      let user = this.user;

      this.user_id = localStorage.getItem("user_id"); 
      let response = await axios.post(BASE_API_URL + 'users/profile/address/edit', {
        'user_id': this.user_id,
        'address_line_1': user.address_line_1,
        'address_line_2': user.address_line_2,
        'country': user.country,
        'postal_code': user.postal_code,
        'phone_number': user.phone_number,
      });

      let updatedProfile = response.data;

      let address = {
        'address_line_1': updatedProfile.address_line_1,
        'address_line_2': updatedProfile.address_line_2,
        'country': updatedProfile.country, 
        'postal_code': updatedProfile.postal_code, 
        'phone_number': updatedProfile.phone_number
      };

      this.$store.commit("updateAddress", address);
      // console.log(this.$store.state.address)

      localStorage.setItem("success", "Profile Updated");
      this.$router.push("/profile")

    }
  }
}
</script>

<style scoped>

.btn{
  width:100% !important;
}

@media only screen and (min-width:768px){
 
  .btn{
    width:auto !important;
  }
  
}

</style>
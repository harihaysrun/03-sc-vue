<template>
  <div class="container">
    <div class="row">

      <div>

        <div class="mt-3">
          <small>Address Line 1</small>
          <h3>{{user.address_line_1}}</h3>
        </div>

        <div class="mt-3">
          <small>Address Line 2</small>
          <h3>{{user.address_line_2}}</h3>
        </div>

        <div class="mt-3">
          <small>Postal Code</small>
          <h3>{{user.postal_code}}</h3>
        </div>
        <div class="mt-3">
          <small>Phone Number</small>
          <h3>{{user.phone_number}}</h3>
        </div>

        <a class="btn btn-primary col-2 mt-3" v-on:click="editAddress">Edit</a>

      </div>


    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";


export default{
  name: 'ProfileTab',
  mounted: async function(){

    // let accessToken = localStorage.getItem("access_token");
    // let response = await axios.get(
    //                             BASE_API_URL + 'users/profile',
    //                             { headers: {"Authorization" : `Bearer ${accessToken}`}}
    //                             );
    // console.log(response.data.user)

    // if(response.data.message != 'Forbidden'){
    //   this.user = response.data.user;
    //   localStorage.setItem("user_id", response.data.user.id);
    // }

    this.user = this.$store.state.address[0];
    // console.log(this.user)

  },
  data: function(){
    return{
      'user': []
    }
  },
  methods:{
    editAddress: function(){
      this.$router.push("/profile/address/edit")
      // window.location.href="/profile/edit"
    }
  }
}
</script>

<style scoped>
small{
  opacity:0.5;
}
</style>
<template>
  <div class="container">
    <div class="row">

      <h1>Edit Profile Details</h1>
      <div class="mt-3">
        <div>
          <label for="username" class="form-label">Username</label>
          <input class="form-control" v-model="user.username" id="username" />
        </div>
        
        <div class="row mt-3">
          <div class="col-6">
            <label for="first-name" class="form-label">First Name</label>
            <input class="form-control" v-model="user.first_name" id="first-name"/>
          </div>
          <div class="col-6">
            <label for="last-name" class="form-label">Last Name</label>
            <input class="form-control" v-model="user.last_name" id="last-name"/>
          </div>
        </div>

        <div class="mt-3">
          <label for="email" class="form-label">Email</label>
          <input class="form-control" v-model="user.email" id="email" type="email" />
        </div>

        <div class="mt-4 d-flex justify-content-end">
          <a class="btn btn-danger mx-2 col-2" v-on:click="backToProfile">Cancel</a>
          <a class="btn btn-success col-2" v-on:click="updateProfile">Update</a>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";


export default{
  name: 'ProfileEdit',
  mounted: async function(){

    // let accessToken = localStorage.getItem("access_token");
    // let response = await axios.get(
    //                             BASE_API_URL + 'users/profile',
    //                             { headers: {"Authorization" : `Bearer ${accessToken}`}}
    //                             );
    // console.log(response.data.user)
    // this.user = response.data.user;

    // localStorage.setItem("user_id", response.data.user.id);

    this.user = this.$store.state.profile[0];

  },
  data: function(){
    return{
      'user': ''
    }
  },
  methods:{
    backToProfile: function(){
      this.$router.push("/profile")
    },
    updateProfile: async function(){

      let user = this.user;

      this.user_id = localStorage.getItem("user_id"); 
      let response = await axios.post(BASE_API_URL + 'users/profile/edit', {
        'user_id': this.user_id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'address_line_1': user.address_line_1,
        'address_line_2': user.address_line_2,
        'postal_code': user.postal_code,
        'phone_number': user.phone_number,
        // 'password': user.password
      });

      console.log(response);

    // let accessToken = localStorage.getItem("access_token");
    // let updatedResponse = await axios.get(
    //                             BASE_API_URL + 'users/profile',
    //                             { headers: {"Authorization" : `Bearer ${accessToken}`}}
    //                             );
    // // console.log(updatedProfile.data)
    let updatedProfile = response.data;

      let profile = {
        // 'user_id': this.user_id,
        'username': updatedProfile.username,
        'email': updatedProfile.email,
        'first_name': updatedProfile.first_name,
        'last_name': updatedProfile.last_name,
        'address_line_1': updatedProfile.address_line_1,
        'address_line_2': updatedProfile.address_line_2,
        'postal_code': updatedProfile.postal_code, 
        'phone_number': updatedProfile.phone_number
      };

      this.$store.commit("updateProfile", profile);
      console.log(this.$store.state.profile)

      localStorage.setItem("success", "Profile Updated");
      this.$router.push("/profile")
      // window.location.href = "/profile"
      // window.location.reload()

    }
  }
}
</script>
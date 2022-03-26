<template>
  <div class="container">
    <div class="row">

      <div>
        <div>
          <small>Username</small>
          <h3>{{user.username}}</h3>
        </div>
        
        <div class="row mt-3">
          <div class="col-6">
            <small>First Name</small>
            <h3>{{user.first_name}}</h3>
          </div>
          <div class="col-6">
            <small>Last Name</small>
            <h3>{{user.last_name}}</h3>
          </div>
        </div>

        <div class="mt-3">
          <small>Email Address</small>
          <h3>{{user.email}}</h3>
        </div>

        <a class="btn btn-primary col-2 mt-3" v-on:click="editProfile">Edit</a>

      </div>

      <a class="btn btn-success col-3 mt-5" v-on:click="editPassword">Change Password</a>


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

    this.user = this.$store.state.profile[0];
    // console.log(this.user)

  },
  data: function(){
    return{
      'user': []
    }
  },
  methods:{
    editProfile: function(){
      this.$router.push("/profile/edit")
      // window.location.href="/profile/edit"
    },
    editPassword: function(){
      this.$router.push("/profile/password/edit")
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
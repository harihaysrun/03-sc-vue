<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light position-sticky top-0" style="z-index:10">
      <div class="container">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link" to="/about">About Us</router-link>
            <router-link class="nav-link" to="/products">Products</router-link>
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </div>
        </div>


        <div class="ml-auto" v-if="user">
          <router-link to="/cart" class="btn">Cart</router-link>
          <router-link to="/profile" class="btn">{{ user.username }}</router-link>
          <a class="btn btn-primary" v-on:click="logout">Logout</a>
        </div>

        <div class="ml-auto" v-else>
          <a href="/register" class="btn">Register</a>
          <a href="/login" class="btn btn-primary">Login</a>
        </div>


      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>

    <footer>
      <div class="container text-center">
        Syahirah 2022
      </div>
    </footer>

  </div>
</template>

<script>

import "@/assets/style.css";
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default {
  name: 'App',
  mounted: async function(){

    // localStorage.setItem("danger_message", "");

    let accessToken = localStorage.getItem("access_token");

    if(accessToken || localStorage.getItem("success")){
      let response = await axios.get(
                                  BASE_API_URL + 'users/profile',
                                  { headers: {"Authorization" : `Bearer ${accessToken}`}}
                                  );
      console.log(response.data.user)

      this.user = response.data.user;
      // console.log(this.user.message)

      // if(response.data.user === undefined){
      //   console.log('undefined')
      //   this.user = ""
      // }
    }

      // let user = this.$store.state.profile[0];
      // console.log(user)
      // if (user){
      //   this.username = user.username;
      // }

  },
  data: function(){
    return{
      'user': ''
      // 'username': ''
    }
  },
  methods: {
    logout: async function () {
      let refreshToken = localStorage.getItem("refresh_token");
      await axios.post(BASE_API_URL + "users/logout", {
        refreshToken: refreshToken,
      });
      // localStorage.setItem("refresh_token", "");
      // localStorage.setItem("access_token", "");
      localStorage.clear();
      
      // window.location.reload();
      window.location.href="/"

    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

footer{
  background-color:black;
  margin-top:50px;
  box-sizing: border-box;
  padding:50px 0;
  color:white;
}

@media only screen and (min-width:992px){

  footer{
    margin-top:120px;
  }
}


</style>

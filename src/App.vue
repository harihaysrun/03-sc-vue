<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light position-sticky top-0" style="z-index:10">
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

  </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default {
  name: 'App',
  mounted: async function(){


    let accessToken = localStorage.getItem("access_token");

    if(accessToken){
      let response = await axios.get(
                                  BASE_API_URL + 'users/profile',
                                  { headers: {"Authorization" : `Bearer ${accessToken}`}}
                                  );
      console.log(response.data.user)
      this.user = response.data.user;
      // console.log(this.user.message)
    }

  },
  data: function(){
    return{
      'user': ''
    }
  },
  methods: {
    logout: async function () {
      let refreshToken = localStorage.getItem("refresh_token");
      await axios.post(BASE_API_URL + "users/logout", {
        refreshToken: refreshToken,
      });
      localStorage.setItem("refresh_token", "");
      localStorage.setItem("access_token", "");
      
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
</style>

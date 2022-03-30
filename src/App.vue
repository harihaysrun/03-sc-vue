<template>
  <div class="main-container">

    <div class="hamburger-menu d-lg-none" v-if="hmOpen">
      <router-link class="hm-nav-link" to="/" v-on:click.native="closeHm">Home</router-link>
      <router-link class="hm-nav-link" to="/about" v-on:click.native="closeHm">About Us</router-link>
      <router-link class="hm-nav-link" to="/products" v-on:click.native="closeHm">Products</router-link>
      <router-link class="hm-nav-link" to="/contact" v-on:click.native="closeHm">Contact</router-link>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light position-sticky top-0" style="z-index:10">
      <div class="container">

        <div class="navbar-nav d-block d-lg-none hm-menu-icon">
          <a v-on:click="openMenu">
            <!-- <img src="@/assets/images/hm-menu.png" alt=""> -->
            <i class="fa-solid fa-bars" v-if="!hmOpen"></i>
            <i class="fa-solid fa-xmark" v-else></i>
          </a>
        </div>

        <div class="navbar-nav d-none d-lg-flex">
          <router-link class="navbar-brand" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About Us</router-link>
          <router-link class="nav-link" to="/products">Products</router-link>
          <router-link class="nav-link" to="/contact">Contact</router-link>
        </div>
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <!-- <div class="collapse navbar-collapse" id="navbarNavAltMarkup"> -->
          
          
        <!-- </div> -->


        <div class="ml-auto d-flex flex-row align-items-center" v-if="user">
          <router-link to="/cart">
            <i class="bi bi-bag"></i>
            <span> {{cart}}</span>
          </router-link>
          <router-link to="/profile" class="mx-4">
            <i class="bi bi-person" style="font-size:20px"></i>
          </router-link>
          <a class="btn btn-logout" v-on:click="logout">Logout</a>
        </div>

        <div class="ml-auto" v-else>
          <a href="/register" class="btn">Register</a>
          <a href="/login" class="btn btn-login">Login</a>
        </div>


      </div>
    </nav>

    <div class="container router-container mt-3">
      <router-view v-on:cart="updateCartLength"></router-view>
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

    let accessToken = localStorage.getItem("access_token");

    if(accessToken || localStorage.getItem("success")){

      let response = await axios.get(
                                  BASE_API_URL + 'users/profile',
                                  { headers: {"Authorization" : `Bearer ${accessToken}`}}
                                  );
      console.log(response.data.user)

      this.user = response.data.user;

      // get number of items in cart upon refresh
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
      this.cart = this.$store.getters.getCartLength;
      
    }

  },
  data: function(){
    return{
      'hmOpen': false,
      'user': '',
      'cart':''
      // 'username': ''
    }
  },
  methods: {
    updateCartLength:function(updatedLength){
      this.cart = updatedLength;
      console.log("updatecartlength triggered: " + updatedLength)
    },
    openMenu: function(){
      if(!this.hmOpen){
        this.hmOpen = true;
      } else{
        this.hmOpen = false;
      }
    },
    closeHm: function(){
      if(this.hmOpen){
        this.hmOpen = false;
      }
    },
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

.main-container{
  /* background-color:pink; */
  min-height:100vh;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}

.router-container{
  min-height:60vh;
}

.hm-menu-icon{
  color:white !important;
  font-size:25px;
  /* width:25px; */
}

.hamburger-menu{
  position:fixed;
  top:50px;
  left:0;
  width:100vw;
  height:calc(100vh - 50px);
  background-color:#1050ff;
  z-index:10;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  /* padding:50px 0; */
}

a{
  text-decoration:none !important;
}

.hm-nav-link{
  font-size:25px;
  margin-bottom:10px;
  color:white;
}

footer{
  /* position:absolute; */
  /* top:75vh; */
  /* width:100%; */
  background-color:black;
  /* margin-top:50px; */
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

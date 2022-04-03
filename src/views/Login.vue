<template>
    <div class="login-container mt-5">

      <div v-if="cartMessage">
        <div class="alert alert-warning" role="alert">
          Please log in or register to add to cart
        </div>
      </div>

      <div v-if="profileMessage">
        <div class="alert alert-warning" role="alert">
          Please log in to view
        </div>
      </div>

      <div v-if="dangerMessage">
        <div class="alert alert-danger" role="alert">
          Incorrect username or password
        </div>
      </div>

      <div v-if="successMessage">
        <div class="alert alert-success" role="alert">
          Your account has been created successfully.
        </div>
      </div>

        <h1 class="text-center">Login</h1>

        <div class="mb-3">
          <label for="">Username: </label>
          <input type="text" v-model="username" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Password: </label>
          <input type="password" v-model="password" class="form-control" />
        </div>
        <div class="mt-4">
          <button v-on:click="submit" class="btn btn-primary">Login</button>
        </div>

    </div>
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Login',
  mounted: function(){
    
    document.title = "Login";

    if (localStorage.getItem("danger_message") === "Please log in or register to add to cart"){
      this.cartMessage = true;
      localStorage.removeItem("danger_message");
    }

    if (localStorage.getItem("danger_message") === "Please log in"){
      this.profileMessage = true;
      localStorage.removeItem("danger_message");
    }

    if (localStorage.getItem("success") === "registered"){
      this.successMessage = true;
      localStorage.removeItem("success");
    }
    
  },
  data: function(){
    return {
      'username': '',
      'password': '',
      'cartMessage': false,
      'profileMessage':false,
      'dangerMessage' : false,
      'successMessage': false
    }
  },
  methods: {
    submit: async function () {

      let response = await axios.post(BASE_API_URL + 'users/login',{
        'username': this.username,
        'password': this.password
      });

      // this.$router.push("/profile");
      // window.location.reload()
      console.log(response.data.error)
      if (response.data.error){
        // this.$router.push('/login');
        this.dangerMessage = true;
      } else{
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        let userResponse = await axios.get(
                          BASE_API_URL + 'users/profile',
                            { headers: {"Authorization" : `Bearer ${response.data.accessToken}`}}
                          );

        console.log(userResponse)
        localStorage.setItem("user_id", userResponse.data.user.id);

        window.location.href="/profile";
        // this.$router.push("/profile")
      }
    },
  }
};

</script>

<style scoped>

.login-container{
  width:80%;
  margin:auto;
}

.btn{
  width:100%;
}

/* .form-control{
  margin-bottom:15px;
} */

h1{
    color:#1050ff;
    font-weight:700;
}

@media only screen and (min-width:992px){

  .login-container{
    width:500px;
  }
  
}

</style>
<template>
  <div class="container mt-lg-5">
    <div class="row">

      <div v-if="updateMessage">
        <div class="alert alert-danger" role="alert">
          Passwords do not match. Please try again
        </div>
      </div>

      <h1>Change Password</h1>
      <div class="mt-3">
        
        <div class="invalid-field" v-if="invalidPw">
          <label for="password" class="form-label">Password</label>
          <input class="form-control" v-model="password" id="password" type="password" />
          <small>Password has to contain at least 8 characters</small>
        </div>
        <div v-else>
          <label for="password" class="form-label">Password</label>
          <input class="form-control" v-model="password" id="password" type="password" />
        </div>

        <div class="invalid-field" v-if="invalidCPw">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input class="form-control" v-model="confirmPassword" id="confirmPassword" type="password" />
        </div>
        <div v-else>
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input class="form-control" v-model="confirmPassword" id="confirmPassword" type="password" />
        </div>

        <div class="mt-4 d-flex flex-column flex-md-row justify-content-md-end">
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
  name: 'Password',
  mounted: function(){

      document.title = "Update Password";

  },
  data: function(){
    return{
      'password': '',
      'confirmPassword':'',
      'updateMessage':false,
      'invalidPw':false,
      'invalidCPw':false
    }
  },
  methods:{
    backToProfile: function(){
      this.$router.push("/profile")
    },
    updateProfile: async function(){

      if (this.password.length < 8){
        this.invalidPw = true;
        this.invalidCPw = true;
      } else {
        this.invalidPw = false;
        this.invalidCPw = false;

        this.user_id = localStorage.getItem("user_id"); 

        if (this.confirmPassword === this.password){
          await axios.post(BASE_API_URL + 'users/profile/password/edit', {
            'user_id': this.user_id,
            'password': this.password
          });

          // console.log(response);

          localStorage.setItem("success", "Profile Updated");
          this.$router.push("/profile")
        }
        else {

          this.updateMessage = true;
          this.password = "";
          this.confirmPassword = "";
        }
      }

    }
  }
}
</script>

<style scoped>

.btn{
  width:100% !important;
}

.invalid-field small{
  color:red;
}

.invalid-field input{
  border:1px solid red !important;
}

@media only screen and (min-width:768px){
 
  .btn{
    width:auto !important;
  }
  
}

</style>
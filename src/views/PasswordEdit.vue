<template>
  <div class="container mt-lg-5">
    <div class="row">

      <div v-if="updateMessage">
        <div class="alert alert-warning" role="alert">
          Passwords do not match. Please try again
        </div>
      </div>

      <h1>Change Password</h1>
      <div class="mt-3">
        <div>
          <label for="password" class="form-label">Password</label>
          <input class="form-control" v-model="password" id="password" type="password" />
        </div>

        <div>
          <label for="confirmPassword" class="form-label">Password</label>
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

      let passwordUpdateFail = localStorage.getItem("danger_message");

      if (passwordUpdateFail === 'Password does not match'){
          this.updateMessage = true;
          localStorage.removeItem("danger_message");
      } else{
          this.updateMessage = false;
      }

  },
  data: function(){
    return{
      'password': '',
      'confirmPassword':'',
      'updateMessage':false
    }
  },
  methods:{
    backToProfile: function(){
      this.$router.push("/profile")
    },
    updateProfile: async function(){

      this.user_id = localStorage.getItem("user_id"); 

      if (this.confirmPassword === this.password){
        let response = await axios.post(BASE_API_URL + 'users/profile/password/edit', {
          'user_id': this.user_id,
          'password': this.password
        });

        console.log(response);

        localStorage.setItem("success", "Profile Updated");
        this.$router.push("/profile")
      }
      else {

        localStorage.setItem("danger_message", "Password does not match");
        window.location.reload()
      }

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
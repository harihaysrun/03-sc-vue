<template>
  <div class="container mt-lg-5">
    <div class="row">

      <h1>Edit Profile Details</h1>

      <div class="alert alert-warning d-flex flex-row justify-content-between align-items-center" role="alert">
        Please log out and in again after updating to view updated details.
      </div>

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

        <div class="mt-3 invalid-field" v-if="invalidEm">
          <label for="email" class="form-label">Email</label>
          <input class="form-control" v-model="user.email" id="email" type="email" />
          <small>Invalid email format</small>
        </div>
        <div class="mt-3" v-else>
          <label for="email" class="form-label">Email</label>
          <input class="form-control" v-model="user.email" id="email" type="email" />
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
  name: 'ProfileEdit',
  mounted: async function(){

    document.title = "Edit Profile";

    // let accessToken = localStorage.getItem("access_token");
    // let response = await axios.get(
    //                             BASE_API_URL + 'users/profile',
    //                             { headers: {"Authorization" : `Bearer ${accessToken}`}}
    //                             );
    // console.log(response.data.user)
    // this.user = response.data.user;

    // localStorage.setItem("user_id", response.data.user.id);

    // const existingUserProfile = JSON.parse(JSON.stringify(this.$store.state.profile[0]))
    // this.user = this.$store.state.profile[0];

  },
  data: function(){
    return{
      'user': JSON.parse(JSON.stringify(this.$store.state.profile[0])),
      'invalidEm': false,
      // 'existingUserProfile': JSON.parse(JSON.stringify(this.$store.state.profile[0]))
    }
  },
  methods:{
    backToProfile: function(){
      this.user = JSON.parse(JSON.stringify(this.$store.state.profile[0]));
      this.$router.push("/profile")
    },
    updateProfile: async function(){

      // this.invalidEm = false;

      if (!this.user.email.includes("@")){
        this.invalidEm = true;
      } else {

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
          'phone_number': user.phone_number
        });

        console.log(response);

      // console.log(updatedProfile.data)
        let updatedProfile = response.data;
        console.log(updatedProfile)

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
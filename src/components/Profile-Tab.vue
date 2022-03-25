<template>
  <div class="container">
    <div class="row">

      <h1>Profile details</h1>
      <div>
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
          <input class="form-control" v-model="user.email" id="email" />
        </div>

        <div class="mt-3">
          <label for="line-1" class="form-label">Address Line 1</label>
          <input class="form-control" v-model="user.address_line_1" id="line-1" />
        </div>

        <div class="mt-3">
          <label for="line-2" class="form-label">Address Line 2</label>
          <input class="form-control" v-model="user.address_line_2" id="line-2" />
        </div>

        <div class="mt-3">
          <label for="postal-code" class="form-label">Postal Code</label>
          <input class="form-control" v-model="user.postal_code" id="postal-code"/>
        </div>
        <div class="mt-3">
          <label for="phone-number" class="form-label">Phone Number</label>
          <input class="form-control" v-model="user.phone_number" id="phone-number"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";


export default{
  name: 'ProfileTab',
  mounted: async function(){

    let accessToken = localStorage.getItem("access_token");
    let response = await axios.get(
                                BASE_API_URL + 'users/profile',
                                { headers: {"Authorization" : `Bearer ${accessToken}`}}
                                );
    console.log(response.data.user)
    this.user = response.data.user;

    localStorage.setItem("user_id", response.data.user.id);

  },
  data: function(){
    return{
      'user': []
    }
  }
}
</script>
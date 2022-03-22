<template>
    <div>
        <h1>Profile</h1>

        {{user.username}}
        <br>
        {{user.email}}
    </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";


export default{
  name: 'Profile',
  created: async function(){

    let accessToken = localStorage.getItem("access_token");
    let response = await axios.get(
                                BASE_API_URL + 'users/profile',
                                { headers: {"Authorization" : `Bearer ${accessToken}`}}
                                );
    console.log(response.data)
    this.user = response.data;

  },
  data: function(){
    return{
      'user': []
    }
  }
}
</script>
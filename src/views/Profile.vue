<template>
    <div>
        <h1>Hi, {{user.username}}!</h1>

        {{user.first_name}} {{user.last_name}}
        <br>
        {{user.email}}
        <br>
        {{user.address_line_1}}, {{user.address_line_2}}
        <br>
        Singapore {{user.postal_code}}
        <br>
        {{user.phone_number}}

    </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";


export default{
  name: 'Profile',
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
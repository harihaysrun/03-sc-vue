<template>
    <div>
        <h1>Login</h1>

        <div>
          <label for="">Username: </label>
          <input type="text" v-model="username" class="form-control" />
        </div>
        <div>
          <label for="">Password: </label>
          <input type="password" v-model="password" class="form-control" />
        </div>
        <div>
          <button v-on:click="submit" class="btn btn-primary mt-3">Submit</button>
        </div>

        <span>{{username}}</span>
        <br>
        <span>{{password}}</span>

    </div>
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Login',
  mounted: function(){
    document.title = "Register"
  },
  data: function(){
    return {
      'username': '',
      'password': ''
    }
  },
  methods: {
    submit: async function () {

      let response = await axios.post(BASE_API_URL + 'users/login',{
        'username': this.username,
        'password': this.password
      });

      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);

      // this.$router.push("/profile");
      // window.location.reload()
      window.location.href="/profile"
    },
  }
};

</script>
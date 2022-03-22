<template>
  <div>
    <h1>Register</h1>
    <!-- <CustomerForm v-on:on-submit="register"></CustomerForm> -->

    <div>
      <label for="">Username: </label>
      <input type="text" v-model="username" class="form-control" />
    </div>
    <div>
      <label for="">Email: </label>
      <input type="email" v-model="email" class="form-control" />
    </div>
    <div>
      <label for="">First Name: </label>
      <input type="text" v-model="first_name" class="form-control" />
    </div>
    <div>
      <label for="">Last Name: </label>
      <input type="text" v-model="last_name" class="form-control" />
    </div>
    <div>
      <label for="">Address Line 1</label>
      <input type="text" v-model="address_line_1" class="form-control" />
    </div>
    <div>
      <label for="">Address Line 2</label>
      <input type="text" v-model="address_line_2" class="form-control" />
    </div>
    <div>
      <label for="">Postal Code</label>
      <input type="text" v-model="postal_code" class="form-control" />
    </div>
    <div>
      <label for="">Phone Number</label>
      <input type="text" v-model="phone_number" class="form-control" />
    </div>
    <div>
      <label for="">Password</label>
      <input type="password" v-model="password" class="form-control" />
    </div>
    <div>
      <button v-on:click="submit" class="btn btn-primary mt-3">Submit</button>
    </div>

     <!-- v-on:click="submit" -->

  </div>
</template>


<script>

// import CustomerForm from "@/components/Register";
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default {
  name: "Add",
  // components: {
  //   CustomerForm,
  // },
  mounted: function(){
    document.title = "Register"
  },
  data: function(){
    return {
      'username': '',
      'email': '',
      'first_name': '',
      'last_name': '',
      'address_line_1': '',
      'address_line_2': '',
      'postal_code': '',
      'phone_number': '',
      'password': ''
    }
  },
  methods: {
    submit: async function () {
      // // first arg: name of mutation
      // // second arg: data we want to send over
      // this.$store.commit("addNewCustomer", data);

      await axios.post(BASE_API_URL + 'users/register',{
        'username': this.username,
        'email': this.email,
        'first_name': this.first_name,
        'last_name': this.last_name,
        'address_line_1': this.address_line_1,
        'address_line_2': this.address_line_2,
        'postal_code': this.postal_code,
        'phone_number': this.phone_number,
        'password': this.password,
      });

      this.$router.push("/login"); // set current route
    },
  },
};
</script>
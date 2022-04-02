<template>
  <div class="register-container">

    <div v-if="message">
      <div class="alert alert-danger d-flex flex-row justify-content-between align-items-center" role="alert">
        Please fill in all fields correctly
        <i class="fa-solid fa-circle-xmark" v-on:click="closeMessage"></i>
      </div>
    </div>
      
    <h1 class="text-center">Register</h1>

    <div class="empty-field" v-if="emptyUn">
      <label for="">Username: </label>
      <input type="text" v-model="username" class="form-control"/>
    </div>
    <div v-else>
      <label for="">Username: </label>
      <input type="text" v-model="username" class="form-control" />
    </div>

    <div class="empty-field" v-if="emptyEm">
      <label for="">Email: </label>
      <input type="email" v-model="email" class="form-control" />
      <small v-if="invalidEm">Invalid email format</small>
    </div>
    <div v-else>
      <label for="">Email: </label>
      <input type="email" v-model="email" class="form-control" />
    </div>

    <div class="row">
      <div class="col-md-6 empty-field" v-if="emptyFn">
        <label for="">First Name: </label>
        <input type="text" v-model="first_name" class="form-control" />
      </div>
      <div class="col-md-6" v-else>
        <label for="">First Name: </label>
        <input type="text" v-model="first_name" class="form-control" />
      </div>

      <div class="col-md-6 empty-field" v-if="emptyLn">
        <label for="">Last Name: </label>
        <input type="text" v-model="last_name" class="form-control" />
      </div>
      <div class="col-md-6" v-else>
        <label for="">Last Name: </label>
        <input type="text" v-model="last_name" class="form-control" />
      </div>
    </div>

    <div class="empty-field" v-if="emptyA1">
      <label for="">Address Line 1</label>
      <input type="text" v-model="address_line_1" class="form-control" />
    </div>
    <div v-else>
      <label for="">Address Line 1</label>
      <input type="text" v-model="address_line_1" class="form-control" />
    </div>

    <div class="empty-field" v-if="emptyA2">
      <label for="">Address Line 2</label>
      <input type="text" v-model="address_line_2" class="form-control" />
    </div>
    <div v-else>
      <label for="">Address Line 2</label>
      <input type="text" v-model="address_line_2" class="form-control" />
    </div>

    <div class="row">
      <div class="col-md-6 empty-field" v-if="emptyCtry">
        <label for="">Country</label>
        <input type="text" v-model="country" class="form-control" />
      </div>
      <div class="col-md-6" v-else>
        <label for="">Country</label>
        <input type="text" v-model="country" class="form-control" />
      </div>

      <div class="col-md-6 empty-field" v-if="emptyPc">
        <label for="">Postal Code</label>
        <input type="text" v-model="postal_code" class="form-control" />
      </div>
      <div class="col-md-6" v-else>
        <label for="">Postal Code</label>
        <input type="text" v-model="postal_code" class="form-control" />
      </div>
    </div>

    <div class="empty-field" v-if="emptyPn">
      <label for="">Phone Number</label>
      <input type="text" v-model="phone_number" class="form-control" />
    </div>
    <div v-else>
      <label for="">Phone Number</label>
      <input type="text" v-model="phone_number" class="form-control" />
    </div>

    <div class="empty-field" v-if="emptyPw">
      <label for="">Password</label>
      <input type="password" v-model="password" class="form-control" />
      <small v-if="invalidPw">Password has to contain at least 8 characters</small>
    </div>
    <div v-else>
      <label for="">Password</label>
      <input type="password" v-model="password" class="form-control" />
    </div>

    <div class="mt-4">
      <button v-on:click="submit" class="btn btn-primary" type="submit">Register</button>
    </div>


  </div>
</template>


<script>

// import CustomerForm from "@/components/Register";
import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default {
  name: "Register",
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
      'country':'',
      'postal_code': '',
      'phone_number': '',
      'password': '',
      'message': false,
      'emptyUn': false,
      'emptyEm': false,
      'emptyFn': false,
      'emptyLn': false,
      'emptyA1': false,
      'emptyA2': false,
      'emptyCtry': false,
      'emptyPc': false,
      'emptyPn': false,
      'emptyPw': false,
      'invalidEm': false,
      'invalidPw': false
    }
  },
  methods: {
    submit: async function () {

      this.emptyUn = false;
      this.emptyEm = false;
      this.emptyFn = false;
      this.emptyLn = false;
      this.emptyA1 = false;
      this.emptyA2 = false;
      this.emptyCtry = false;
      this.emptyPc = false;
      this.emptyPn = false;
      this.emptyPw = false;
      this.invalidEm = false;
      this.invalidPw = false;

      if (!this.username){
        this.emptyUn = true;
      } 
      if (!this.email){
        this.emptyEm = true;
      }
      if (this.email && !this.email.includes("@")){
        this.emptyEm = true;
        this.invalidEm = true;
      }
      if (!this.first_name){
        this.emptyFn = true;
      }
      if (!this.last_name){
        this.emptyLn = true;
      }
      if (!this.address_line_1){
        this.emptyA1 = true;
      }
      if (!this.address_line_2){
        this.emptyA2 = true;
      }
      if (!this.country){
        this.emptyCtry = true;
      }
      if (!this.postal_code){
        this.emptyPc = true;
      }
      if (!this.phone_number){
        this.emptyPn = true;
      }
      if (!this.password){
        this.emptyPw = true;
      }
      if (this.password && this.password.length < 8){
        this.emptyPw = true;
        this.invalidPw = true;
      }

      
      if (this.username &&
          this.email &&
          this.email.includes("@") &&
          !this.invalidPw &&
          this.first_name &&
          this.last_name &&
          this.address_line_1 &&
          this.address_line_2 &&
          this.country &&
          this.postal_code &&
          this.phone_number &&
          this.password &&
          !this.invalidPw){
          await axios.post(BASE_API_URL + 'users/register',{
            'username': this.username,
            'email': this.email,
            'first_name': this.first_name,
            'last_name': this.last_name,
            'address_line_1': this.address_line_1,
            'address_line_2': this.address_line_2,
            'country': this.country,
            'postal_code': this.postal_code,
            'phone_number': this.phone_number,
            'password': this.password,
          });

          localStorage.setItem("success", "registered")
          this.$router.push("/login");
      } else{
        this.message = true;
      }

    },
    closeMessage: function(){
      this.message = false;
    }
  }
};
</script>

<style scoped>

/* .register-container{
  width:80%;
  margin:auto;
} */

.btn{
  width:100%;
}

h1{
    color:#1050ff;
    font-weight:700;
}

i{
  cursor: pointer;
}

.empty-field small{
  color:red;
}

.empty-field input{
  border:1px solid red !important;
}

@media only screen and (min-width:992px){

  .register-container{
    width:500px;
    margin:auto;
  }
  
}

</style>
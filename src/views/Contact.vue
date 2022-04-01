<template>
    <div class="contact-container">

      <div v-if="successMessage">
        <div class="alert alert-success" role="alert">
          Thanks for the enquiry! We will get back to you soon.
        </div>
      </div>
      
      <div v-if="dangerMessage">
        <div class="alert alert-danger" role="alert">
          You are required to fill in all fields.
        </div>
      </div>

      <h1 class="text-center">Contact Us</h1>

      <div class="mb-1 empty-field" v-if="emptyName">
        <label for="name" class="form-label">Name</label>
        <input type="text" v-model="name" class="form-control" />
      </div>
      <div class="mb-1" v-else>
        <label for="name" class="form-label">Name</label>
        <input class="form-control" v-model="name" id="name" />
      </div>

      <div class="mb-1 empty-field" v-if="invalidEm">
        <label for="">Email: </label>
        <input type="email" v-model="email" class="form-control" />
        <small v-if="invalidEm">Invalid email format</small>
      </div>
      <div class="mb-1" v-else>
        <label for="email" class="form-label">E-mail Address</label>
        <input class="form-control" v-model="email" id="email" />
      </div>

      <div class="mb-1 empty-field" v-if="emptyReason">
        <label for="reason" class="form-label">Reason</label>
        <select name="reason" v-model="reason" class="form-control" id="reason">
          <option value="0" disabled>Choose one</option>
          <option :value="r[0]" v-for="r in reasons" v-bind:key="r.id">
              {{r[1]}}
          </option>
        </select>
      </div>
      <div class="mb-1" v-else>
        <label for="">Reason</label>
        <select name="reason" v-model="reason" class="form-control" id="reason">
          <option value="0" disabled>Choose one</option>
          <!-- <option value="1">General Enquiry</option>
          <option value="2">Product Request</option>
          <option value="3">Ammend an order</option>
          <option value="4">Cancel an order</option>
          <option value="5">Feedback</option>
          <option value="6">Others</option> -->
          <option :value="r[0]" v-for="r in reasons" v-bind:key="r.id">
              {{r[1]}}
          </option>
        </select>
      </div>

      <div class="mb-1 empty-field" v-if="emptyTitle">
        <label for="title" class="form-label">Title</label>
        <input type="text" v-model="title" class="form-control" />
      </div>
      <div class="mb-1" v-else>
        <label for="title" class="form-label">Title</label>
        <input class="form-control" v-model="title" id="title" />
      </div>

      <div class="mb-4 empty-field" v-if="emptyMsg">
        <label for="message" class="form-label">Your message</label>
        <textarea class="form-control" name="message" id="message" v-model="message"></textarea>
      </div>
      <div class="mb-4" v-else>
        <label for="message" class="form-label">Your message</label>
        <textarea class="form-control" name="message" id="message" v-model="message"></textarea>
      </div>

      <div>
        <button v-on:click="submit" class="btn btn-primary">
          Submit
        </button>
      </div>

    </div>
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Contact',
  mounted:async function(){
    document.title = "Contact"
    let response = await axios.get(BASE_API_URL + 'contact');
    console.log(response.data.reasons)

    this.reasons = response.data.reasons;
  },
  data: function(){
    return{
      'name': '',
      'email': '',
      'reasons':[],
      'reason': 0,
      'title': '',
      'message': '',
      'successMessage': false,
      'dangerMessage': false,
      'invalidEm': false,
      'emptyName':false,
      'emptyReason': false,
      'emptyTitle': false,
      'emptyMsg': false
    }
  },
  methods:{
    submit: async function(){

      this.emptyName = false;
      this.invalidEm = false;
      this.emptyReason = false;
      this.emptyTitle = false;
      this.emptyMsg = false;

      if (!this.name){
        this.emptyName = true;
      }
      if(!this.email || this.email && !this.email.includes("@")){
        this.invalidEm = true;
      }
      if (!this.reason){
        this.emptyReason = true;
      }
      if (!this.title){
        this.emptyTitle = true;
      }
      if (!this.reason){
        this.emptyMsg = true;
      }
      
      if(this.name &&
        this.email &&
        this.email.includes("@") &&
        this.reason &&
        this.title &&
        this.message){

          this.dangerMessage = false;

          let enquiry = await axios.post(BASE_API_URL + 'contact',{
            'name':this.name,
            'email': this.email,
            'reason_id': this.reason,
            'title': this.title,
            'message': this.message
          })

          this.name = "";
          this.email = "";
          this.reason = 0;
          this.message = "";

          this.successMessage = true;

          console.log(enquiry);
          
        } else{
        this.dangerMessage = true;
      }

    }
  }
}
</script>

<style scoped>

h1{
    color:#1050ff;
    font-weight:700;
}

.btn{
  width:100%;
}

textarea{
  height:250px;
  border-radius:25px !important;
}

.empty-field small{
  color:red;
}

.empty-field input, .empty-field select, .empty-field textarea{
  border:1px solid red !important;
}


@media only screen and (min-width:992px){

  .contact-container{
    width:500px;
    margin:auto;
  }
  
}

</style>
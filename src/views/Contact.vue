<template>
    <div class="contact-container">

      <h1 class="text-center">Contact Us</h1>

      <div class="mb-1">
        <label for="name" class="form-label">Name</label>
        <input class="form-control" v-model="name" id="name" />
      </div>

      <div class="mb-1">
        <label for="email" class="form-label">E-mail Address</label>
        <input class="form-control" v-model="email" id="email" />
      </div>

      <div class="mb-1">
        <label for="">Reason</label>
        <select name="brand" v-model="reason" class="form-control" id="reason">
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

      <div class="mb-4">
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
      'message': '',
    }
  },
  methods:{
    submit: async function(){
      let enquiry = await axios.post(BASE_API_URL + 'contact',{
        'name':this.name,
        'email': this.email,
        'reason_id': this.reason,
        'message': this.message
      })

      console.log(enquiry);
      
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


@media only screen and (min-width:992px){

  .contact-container{
    width:500px;
    margin:auto;
  }
  
}

</style>
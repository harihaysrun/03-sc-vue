<template>
  <div class="container">
    <div class="row">

      <div>

        <div class="col-12 col-md-4">
          <small>Address Line 1</small>
          <h3>{{user.address_line_1}}</h3>
        </div>

        <div class="col-12 col-md-4 mt-4">
          <small>Address Line 2</small>
          <h3>{{user.address_line_2}}</h3>
        </div>

        <div class="col-12 col-md-4 mt-4">
          <small>Country</small>
          <h3>{{user.country}}</h3>
        </div>

        <div class="col-12 col-md-4 mt-4">
          <small>Postal Code</small>
          <h3>{{user.postal_code}}</h3>
        </div>
        <div class="col-12 col-md-4 mt-4">
          <small>Phone Number</small>
          <h3>{{user.phone_number}}</h3>
        </div>

        <a class="btn btn-primary my-4 me-md-3" v-on:click="editAddress">Edit Address</a>

      </div>


    </div>
  </div>
</template>

<script>

export default{
  name: 'ProfileTab',
  mounted: async function(){

    this.user = this.$store.state.address[0];

  },
  data: function(){
    return{
      'user': []
    }
  },
  methods:{
    editAddress: function(){
      this.$router.push("/profile/address/edit")
    }
  }
}
</script>

<style scoped>

small{
  opacity:0.5;
}

.btn{
  width:100% !important;
}

@media only screen and (min-width:768px){
 
  .btn{
    width: auto !important;
  }
  
}
</style>
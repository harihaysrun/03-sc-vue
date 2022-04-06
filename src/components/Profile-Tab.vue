<template>
  <div class="container">
    <div class="row">

      <div>
        <div class="col-12 col-md-4">
          <small>Username</small>
          <h3>{{user.username}}</h3>
        </div>
        
        <div class="col-12 col-md-6 mt-4 d-flex flex-column flex-md-row justify-content-start">
          <div class="me-md-5">
            <small>First Name</small>
            <h3>{{user.first_name}}</h3>
          </div>
          <div>
            <small>Last Name</small>
            <h3>{{user.last_name}}</h3>
          </div>
        </div>

        <div class="col-12 col-md-4 mt-4">
          <small>Email Address</small>
          <h3>{{user.email}}</h3>
        </div>
        
        <div class="mt-4">
          <a class="btn btn-primary mb-3 mb-md-0 me-md-3" v-on:click="editProfile">Edit Profile</a>
          <a class="btn btn-primary" v-on:click="editPassword">Change Password</a>
        </div>

      </div>


    </div>
  </div>
</template>

<script>

export default{
  name: 'ProfileTab',
  mounted: function(){

    this.user = this.$store.state.profile[0];

  },
  data: function(){
    return{
      'user': []
    }
  },
  methods:{
    editProfile: function(){
      this.$router.push("/profile/edit")
    },
    editPassword: function(){
      this.$router.push("/profile/password/edit")
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
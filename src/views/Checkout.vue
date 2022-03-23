<template>
  <div>
    HI
  </div>
</template>


<script>

// import axios from 'axios';
// const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Checkout',
  mounted: async function(){

    this.user_id = localStorage.getItem("user_id"); 

    console.log(this.$route.params.id)
    // let response = await axios.post(BASE_API_URL + 'success/' + this.$route.params.id, {
    //   'user_id': this.user_id
    // });
    // console.log(response)
  },
}

</script>

<template>
  <div>
    
    <h1 class="text-center m-0 mt-5">Your order has been placed successfully!</h1>

    <div class="d-flex flex-column align-items-center my-5">

      <div class="total-box">

        <div class="total-header text-center">  
          <h2 class="m-0">Order #{{order.id}}</h2>
        </div>

        <div class="total-body p-5 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-md-between" v-for="item in orderItems" v-bind:key="item.id">
          
          <div class="d-md-flex flew-row align-items-center mb-3 mb-md-0">
            <img v-bind:src="item.image_url" class="card-img-top mb-3 mb-md-0 me-md-3" alt="...">
            <div>
              <h5>{{item.product_brand}} {{ item.product_name }}</h5>
              <small class="me-2 me-md-0 text-primary">Quantity: {{item.quantity}}</small> <small class="text-muted">(${{item.cost}} each)</small>
            </div>
          </div>

          <div class="d-flex flex-row flex-md-column align-items-center justify-content-center">
            
            <h5 class="me-2 me-md-0">${{item.total_cost}}</h5>
          </div>
          
        </div>

        <div class="mb-4 d-flex justify-content-between">
          <span>Subtotal</span>
          <span>${{order.amount - 3}}</span>
        </div>

        <div class="mb-4 d-flex justify-content-between">
          <span>Shipping</span>
          <span>$3</span>
        </div>
            
        <hr>

        <div class="d-flex flex-row justify-content-between p-5">  
          <h5>Grand total</h5>
          <h5 class="text-primary">${{order.amount}}</h5>
        </div>

      </div>
    </div>
    

  </div>
</template>


<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Checkout',
  mounted: async function(){

    document.title = "Order Successfully Placed";

    this.user_id = localStorage.getItem("user_id"); 

    console.log(this.$route.params.id)
    let response = await axios.post(BASE_API_URL + 'checkout/success/' + this.$route.params.id, {
      'user_id': this.user_id
    });
    console.log(response.data)

    this.orderItems = response.data.orderItems;
    this.order = response.data.order;

    // this.$store.commit("updateCartLength", 0);
  },
  data: function(){
    return{
      'orderItems':[],
      'order':[]
    }
  }
}

</script>

<style scoped>

h1,h2,h3,h4,h5{
  margin:0;
}

.text-primary{
  color: #1050ff !important;
}

.total-box{
  width:100%;
  border:2px solid #1050ff;
  border-radius:25px;
  overflow:hidden;
  box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

.total-header{
  padding:30px 40px;
  background-color: #1050ff;
  color:white;
  font-weight:700;
  font-size:25px;
}

.total-body{
  position:relative;
  /* border-bottom: 1px solid lightgray; */
}

.total-body::after{
  content:'';
  position:absolute;
  bottom:0;
  left:0;
  right:0;
  margin: auto;
  width:90%;
  height:1px;
  background-color:#ebebeb;
}

.card-img-top{
  width:80px;
}

@media only screen and (min-width:992px){

  .total-box{
    width:600px;
  }

}

</style>
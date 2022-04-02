<template>
    <div>

        <div v-if="updateMessage">
          <div class="alert alert-success d-flex flex-row justify-content-between align-items-center" role="alert">
            Quantity for {{itemName}} has been updated
            <i class="fa-solid fa-circle-xmark" v-on:click="closeUpdateMessage"></i>
          </div>
        </div>
        <div v-if="deleteMessage">
          <div class="alert alert-danger d-flex flex-row justify-content-between align-items-center" role="alert">
            {{itemName}} has been removed from your cart
            <i class="fa-solid fa-circle-xmark" v-on:click="closeDeleteMessage"></i>
          </div>
        </div>
        <div v-if="warningMessage">
          <div class="alert alert-warning d-flex flex-row justify-content-between align-items-center" role="alert">
            Only {{stockNo}} left in stock for {{itemName}}
            <i class="fa-solid fa-circle-xmark" v-on:click="closeWarningMessage"></i>
          </div>
        </div>
        <div v-if="invalidQtyMessage">
          <div class="alert alert-danger d-flex flex-row justify-content-between align-items-center" role="alert">
            Invalid quantity. A minimum of 1 product is required.
            <i class="fa-solid fa-circle-xmark" v-on:click="closeInvalidQtyMessage"></i>
          </div>
        </div>

      <h1 class="mb-3">Your Cart</h1>

      <p v-if="emptyCart">
        Your cart is empty
      </p>

  <div class="container" v-else>
    <div class="row">

      <div class="float-left col-12 col-lg-8">
        
        <!-- <div v-else> -->

          <div class="d-flex flex-column">

            <div class="card d-flex flex-column flex-lg-row p-3 mb-3" v-for="item in cartItems" v-bind:key="item.id">
              
              <div style="flex:2" class="d-flex flex-row align-items-center">
                <img v-bind:src="item.product.image_url" class="me-3 card-img-top"  alt="...">
                <div>
                    {{item.product.brand}}
                  <h5>{{ item.product.name }}</h5>
                  ${{ item.product.cost }}
                </div>
              </div>
              
              <div style="flex:3" class="mt-3 mt-lg-0 d-flex flex-row justify-content-between align-items-center">
                <div class="text-center w-100 d-flex flex-column align-items-start align-items-lg-center">
                  <div>
                    <label for="">Quantity</label>
                    <input type="text" v-model="item.quantity" class="form-control">
                    
                    <div class="mt-2">
                      In stock: {{item.product.stock_no}}
                    </div>
                  </div>
                </div>
              <!-- </div> -->

              <!-- <div style="flex:1" class="d-flex flex-row align-items-center justify-content-end"> -->
                <div class="d-flex flex-row">
                  <a class="mx-2 icon-btns edit-btn" v-on:click="updateQuantity(item.product.stock_no, item.product_id, item.quantity, item.product.name, item.product.cost)">
                    <img src="@/assets/images/edit.svg" alt="">
                    Update
                  </a>
                  <a class="mx-2 icon-btns delete-btn" v-on:click="removeItem(item.product_id, item.product.name)">
                    <img src="@/assets/images/delete.svg" alt="">
                    Remove
                  </a>
                </div>
              </div>

            </div>
          </div>

        <!-- </div> -->

      </div>

      <div class="float-right col-12 col-lg-4">

        <div class="total-box mb-5">

          <div class="total-header">
            Total
          </div>
          
          <div class="total-body">
            <div class="mb-4 d-flex justify-content-between">
              <span>Total</span>
              <span>${{total}}</span>
            </div>
            <div class="mb-4 d-flex justify-content-between">
              <span>Shipping</span>
              <span>$3</span>
            </div>
            
            <hr>

            <div class="mb-5 d-flex justify-content-between">
              <span><b>Grand Total</b></span>
              <span>${{grandTotal}}</span>
            </div>

            <a class="btn btn-success w-100" v-on:click="checkout">Proceed to payment</a>

          </div>
        
        </div>
      </div>
          
    </div>
  </div>
        
    </div>
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-03-sunscreen.herokuapp.com/api/";

export default{
  name: 'Cart',
  created: async function(){
    this.accessToken = localStorage.getItem("access_token");
    // console.log(this.accessToken)

    this.user_id = localStorage.getItem("user_id"); 
    let response = await axios.post(BASE_API_URL + 'cart/', {
              'user_id': this.user_id
            });
    console.log(response.data)

    this.cartItems = response.data.cartItems;

    if (this.cartItems.length === 0){
      this.emptyCart = true;
    } else{
      this.emptyCart = false;
    }

    let total = 0;

    for (let i=0; i<this.cartItems.length; i++){
      let quantity = this.cartItems[i].quantity;
      let cost = this.cartItems[i].product.cost;
      let totalForOneProduct = quantity * cost;
      console.log(`total for ${this.cartItems[i].product.name} is ${totalForOneProduct}`)
      total += totalForOneProduct;
      this.total = total;
    }

    this.grandTotal = total + 3;
    console.log(`grand total is is ${total}`)


  },
  data: function(){
    return{
      'emptyCart':'true',
      'cartItems': [],
      'accessToken': '',
      'user_id':'',
      'updateMessage': false,
      'deleteMessage': false,
      'warningMessage': false,
      'invalidQtyMessage': false,
      'itemName':'',
      'stockNo':'',
      'total': '',
      'grandTotal':  ''
    }
  },
  methods:{
    closeUpdateMessage: function(){
      this.updateMessage = false;
    },
    closeDeleteMessage: function(){
      this.deleteMessage = false;
    },
    closeWarningMessage: function(){
      this.warningMessage = false;
    },
    closeInvalidQtyMessage: function(){
      this.invalidQtyMessage = false;
    },
    updateQuantity: async function(stockNo, productId, newQuantity, itemName){
      if(this.accessToken){

        newQuantity = parseInt(newQuantity);
        console.log(newQuantity)

        if(newQuantity <= 0) {
          this.invalidQtyMessage = true;
        } else {
          let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/update', {
            'user_id': this.user_id,
            'quantity': stockNo,
            'newQuantity': newQuantity
          });
          console.log(response);

          // update cart length

          let cartResponse = await axios.post(BASE_API_URL + 'cart', {
            'user_id': this.user_id
          })

          let cartItems = cartResponse.data.cartItems;
          let updatedQuantity = 0;
          let total = 0;

          for (let i=0; i<cartItems.length; i++){
            console.log(cartItems[i].quantity)
            updatedQuantity += cartItems[i].quantity;

            // update cart total & grandtotal
            let quantity = cartItems[i].quantity;
            let cost = cartItems[i].product.cost;
            let totalForOneProduct = quantity * cost;
            console.log(`total for ${cartItems[i].product.name} is ${totalForOneProduct}`)
            total += totalForOneProduct;
            this.total = total;

          }

          this.$store.commit("updateCartLength", updatedQuantity);
          this.$emit("cart", this.$store.getters.getCartLength);

          this.grandTotal = total + 3;
          console.log(`grand total is is ${total}`)

          this.deleteMessage = false;
          this.warningMessage = false;
          this.itemName = itemName;
          this.updateMessage = true;

          if (response.data.stock === "not enough"){
            
            this.deleteMessage = false;
            this.updateMessage = false;
            this.stockNo = stockNo;
            this.warningMessage = true;
          }
        } 

      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    },
    removeItem: async function(productId, itemName){
      if(this.accessToken){

        let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/remove', {
          'user_id': this.user_id
        });
        
        console.log(response);

        let refreshResponse = await axios.post(BASE_API_URL + 'cart/', {
                  'user_id': this.user_id
                });

        this.cartItems = refreshResponse.data.cartItems;


        let cartResponse = await axios.post(BASE_API_URL + 'cart', {
          'user_id': this.user_id
        })

        let cartItems = cartResponse.data.cartItems;
        let updatedQuantity = 0;
        let total = 0;

        for (let i=0; i<cartItems.length; i++){
          console.log(cartItems[i].quantity)
          updatedQuantity += cartItems[i].quantity;

          // update cart total & grandtotal
          let quantity = cartItems[i].quantity;
          let cost = cartItems[i].product.cost;
          let totalForOneProduct = quantity * cost;
          console.log(`total for ${cartItems[i].product.name} is ${totalForOneProduct}`)
          total += totalForOneProduct;
          this.total = total;
        }

        this.$store.commit("updateCartLength", updatedQuantity);
        this.$emit("cart", this.$store.getters.getCartLength)

        this.grandTotal = total + 3;
        console.log(`grand total is is ${total}`)

        this.updateMessage = false;
        this.warningMessage = false;
        this.itemName = itemName;
        this.deleteMessage = true;

        if (this.cartItems.length === 0){
          this.emptyCart = true;
        } else{
          this.emptyCart = false;
        }

      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    },
    checkout: async function(){
      if(this.accessToken){
        this.user_id = localStorage.getItem("user_id"); 
        let response = await axios.post(BASE_API_URL + 'checkout', {
          'user_id': this.user_id
        });

        // let response = await axios.get(BASE_API_URL + 'checkout');
        console.log(response.data)

        let stripeSession = response.data.url;

        console.log(stripeSession)

        window.location.href = response.data.url;

        // this.$router.push("/checkout");
      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/cart"
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

.card{
  border-radius:25px;
}

.card-img-top{
  width:100px;
}


/* .icon-btns img{
    width:20px;
    display:block;
    margin-right:5px;
} */

.edit-btn{
    color:#1050ff;
}

.delete-btn{
    color:#dc3545;
}

.icon-btns{
  /* width:100px; */
  padding:10px;
  border-radius:15px;
  font-size:12px;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
}    

.icon-btns img{
  width:30px;
  /* display:inline-block; */
  margin-bottom:5px;
  /* margin-right: 0; */
}

.icon-btns i{
  font-size:30px;
  margin-bottom:5px;
}


i{
  cursor: pointer;
}

.edit-btn:hover{
  color:#1050ff;
  background-color:rgb(16, 80, 255, 0.1);
}

.delete-btn:hover{
  color:#dc3545;
  background-color:rgb(220, 53, 69, 0.1);
}

.form-control{
  width:120px;
  text-align:center;
  /* border-radius:0 !important; */
  /* border:1px solid black !important; */
  margin: 0 5px;
}

button{
  border:0;
  border-radius:50%;
}

.btn-quantity{
  width:50px !important;
  background-color:#1050ff;
  color:white;
  /* border:1px solid #1050ff; */
}

.total-box{
  border:2px solid #1050ff;
  border-radius:25px;
  overflow:hidden;
  box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

.total-header{
  padding:20px 30px;
  background-color: #1050ff;
  color:white;
  font-weight:700;
  font-size:25px;
}

.total-body{
  padding:25px;
}

</style>
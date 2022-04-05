<template>

  <div>

    <a v-on:click="goBack" class="back-btn mt-3">
      <i class="fa-solid fa-arrow-left"></i> Back
    </a>

    <div class="d-flex flex-column flex-lg-row mt-3">

      <div class="product-image mb-3 mb-lg-0" style="flex:1">
        <img v-bind:src="image_url" alt="" style="width:100%;">
      </div>

      <div class="product-info ps-lg-5" style="flex:1">

        <h4>{{brand}}</h4>
        <h1>{{name}}</h1>
        <h2>${{cost}}</h2>

        <div class="mt-4">

          <div class="mb-3"><i class="bi bi-brightness-high me-2"></i> <b>SPF Rating:</b> {{spf}}</div>

          <div class="mb-3"><i class="fa-solid fa-earth-asia me-2"></i> <b>Imported from:</b> {{country}}</div>
          
          <div class="mb-3"><i class="bi bi-info-circle me-2"></i> <b>Type of sunscreen:</b> {{type}}</div>
          
          <div class="mb-3"><i class="bi bi-calendar2-x me-2"></i> <b>Batch expiry:</b> {{expiry}}</div>
          
          <div class="mb-3">
            <i class="fa-solid fa-check me-2"></i> <b>Suitable for:</b>
            <ul class="ms-2">
              <li v-for="type in skin_types" v-bind:key="type.id">
                {{type.name}}
              </li>
            </ul>
          </div>

        </div>
        
        <div class="mt-5 mb-5">

          <div class="tab-container">
            <a class="current-tab" v-if="tab === 'description'">Description</a>
            <a class="inactive-tab" v-on:click="switchToDescription" v-else>Description</a>

            <a class="current-tab" v-if="tab === 'filters'">Filters</a>
            <a class="inactive-tab" v-on:click="switchToFilters" v-else>Filters</a>
          </div>

          <div class="mt-3 tab-body" v-if="tab === 'description'">
            {{description}}
          </div>
          <div class="mt-3 tab-body" v-if="tab === 'filters'">
          {{ingredients}}
          </div>

        </div>
        
        <div class="mt-3">
          <div class="mb-3 text-muted" v-if="stock != 0">{{stock}} {{status}}</div>
          <div class="mb-3 text-danger" v-else>{{status}}</div>
          <div class="mb-3" v-if="stock != 0">
            <div class="d-flex flex-row">
              <button v-on:click="minus" class="btn-quantity left">-</button>
              <input type="text" v-model="quantity_to_add" class="form-control" disabled>
              <button v-on:click="plus" class="btn-quantity right">+</button>
            </div>
            <a class="btn btn-primary mt-3 addtocart-btn" v-on:click="addToCart(id, quantity_to_add)">Add to cart</a>
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
  name: 'Products',
  created: async function(){

    let productId = localStorage.getItem("product_id");
    console.log("productId: " + productId);

    let response = await axios.get(BASE_API_URL + 'products/' + productId);
    // console.log(response.data.product)

    let product = response.data.product;
    this.id = product.id;
    this.brand = product.brand.name;
    this.name = product.name;
    this.spf = product.spf;
    this.country = product.country.name;
    this.type = product.type.name;
    this.cost = product.cost;
    this.description = product.description;
    this.skin_types = product.skinTypes;
    this.ingredients = product.ingredients;
    this.expiry = product.expiry;
    this.status = product.status.name;
    this.stock = product.stock_no;
    this.image_url = product.image_url;
    
    document.title = `${this.brand} ${this.name}`;

    this.accessToken = localStorage.getItem("access_token");
    console.log(this.accessToken)
  },
  data: function(){
    return{
      'tab': 'description',
      'id':'',
      'brand': '',
      'name': '',
      'spf': '',
      'country': '',
      'type': '',
      'cost': '',
      'description': '',
      'skin_types': [],
      'ingredients': '',
      'expiry': '',
      'status': '',
      'stock': '',
      'image_url': '',
      'accessToken':'',
      'quantity_to_add': 1
    }
  },
  // props:[
  //   'productId'
  // ],
  methods:{
    goBack: function(){
      this.$router.push("/products");
    },
    switchToDescription: function(){
      this.tab = "description"
    },
    switchToFilters: function(){
      this.tab = "filters"
    },
    plus: function(){
      if(this.quantity_to_add === this.stock){
        return
      } else{
        this.quantity_to_add += 1
      }
    },
    minus: function(){
      if(this.quantity_to_add === 1){
        return;
      } else{
        this.quantity_to_add -= 1
      }
    },
    addToCart: async function(productId, quantityToAdd){
      
      if(this.accessToken){
        // console.log("user is logged in")

        if(this.$store.getters.getCartLength){
          let prevCartLength = parseInt(this.$store.getters.getCartLength);
          this.$store.commit("updateCartLength", prevCartLength + quantityToAdd);
          console.log('updated cart length from store: ' + this.$store.getters.getCartLength)
        }
        // localStorage.setItem("cart_length", prevCartLength + 1);

        else {
          this.$store.commit("updateCartLength", 1);
          console.log('updated cart length from store: ' + this.$store.getters.getCartLength)
        }

        this.$emit("cart", this.$store.getters.getCartLength)


        this.user_id = localStorage.getItem("user_id"); 
        console.log(this.user_id)

        let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/add', {
          'user_id': this.user_id,
          'quantity_to_add': quantityToAdd
        });
        console.log(response.data)
        
      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          window.location.href="/login"
      }
    }
  }
}
</script>

<style scoped>

h1, i{
    color:#1050ff;
    font-weight:700;
}

h1,h2,h4{
  margin:0;
}

button{
  border:0;
  border-radius:50%;
}

.btn-quantity{
  width:56px !important;
  background-color:#1050ff;
  color:white;
  /* border:1px solid #1050ff; */
}

.back-btn{
  /* border:1px solid #1050ff; */
  color:#1050ff;
  cursor:pointer;
}

.back-btn i{
  margin-right:10px;
}

/* .left{
  border-radius:15px 0 0 15px;
}

.right{
  border-radius:0 15px 15px 0;
} */

.form-control{
  width:100px;
  text-align:center;
  /* border-radius:0 !important; */
  /* border:1px solid black !important; */
  margin: 0 5px;
}

.addtocart-btn{
  width:100%;
}

.tab-container{
  border-bottom: 1px solid #e3e3e3;
  padding: 10px 0;
}

.tab-container a{
  padding: 10px 15px;
  cursor: pointer;
}

.tab-body{
  padding: 0 15px;
}

.current-tab{
  border-radius:0 !important;
  font-weight:700;
  color:#1050ff;
  border-bottom: 3px solid #1050ff;
}

.inactive-tab{
  color:gray;
}

@media only screen and (min-width:768px){
  .addtocart-btn{
    width:250px;
  }
}
</style>
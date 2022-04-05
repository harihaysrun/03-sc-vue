<template>
    <div>

      <div v-if="dangerMessage">
        <div class="alert alert-danger" role="alert">
          0 left in stock
        </div>
      </div>

        <h1>Products</h1>

        <div class="search-form d-flex flex-column flex-lg-row align-items-lg-end mb-4">

          <div class="mb-2 m-lg-2">
            <label for="">Name</label>
            <input type="text" v-model="name" class="form-control" />
          </div>

          <div class="mb-2 m-lg-2">
            <label for="">Brand</label>
            <select name="brand" v-model="brand" class="form-control"  id="brand">
              <option value="0" disabled>Choose one</option>
              <option :value="b[0]" v-for="b in brands" v-bind:key="b.id">
                {{b[1]}}
              </option>
            </select>
          </div>

          <div class="mb-2 m-lg-2">
            <label for="">Country</label>
            <select name="country" v-model="country" class="form-control"  id="country">
              <option value="0" disabled>Choose one</option>
              <option :value="c[0]" v-for="c in countries" v-bind:key="c.id">
                {{c[1]}}
              </option>
            </select>
          </div>

          <div class="mb-2 m-lg-2">
            <label for="">Sunscreen Type</label>
            <select name="type" v-model="type" class="form-control"  id="type">
              <option value="0" disabled>Choose one</option>
              <option :value="t[0]" v-for="t in types" v-bind:key="t.id">
                {{t[1]}}
              </option>
            </select>
          </div>

          <div class="my-3 m-lg-2">
            <button v-on:click="search" class="btn btn-primary">
              <i class="fa-solid fa-magnifying-glass"></i> Search
            </button>
          </div>

        </div>

        
        <div class="container">
          <div class="row">

            <div class="col-12 col-md-6 col-lg-3 p-2" v-for="p in products" v-bind:key="p.id">

              <div class="card h-100">
                <a class="card-title" v-on:click="viewThisProduct(p.id)">

                  <div class="name-cost-box d-flex flex-row justify-content-between">
                      <span>{{p.brand.name}}
                            <h5>{{ p.name }}</h5></span>
                      <!-- <h5 class="cost">${{ p.cost }}</h5> -->
                  </div>

                  <div class="image-box">
                    <img v-bind:src="p.image_url">
                  </div>
                
                </a>
              
                <div class="buttons-box mt-auto">
                  <a class="btn btn-primary" v-on:click="addToCart(p.id, p.stock_no)" v-if="p.status_id === 1 && p.stock_no != 0"><b>${{ p.cost }}</b> – Add to cart</a>
                  <a class="btn btn-primary" v-on:click="addToCart(p.id, p.stock_no)" v-else-if="p.status_id === 3 && p.stock_no != 0"><b>${{ p.cost }}</b> – Pre-order</a>
                  <a class="btn btn-danger" v-else-if="p.status_id === 3 && p.stock_no === 0"><b>${{ p.cost }}</b> – Out of stock</a>
                  <a class="btn btn-danger" v-else><b>${{ p.cost }}</b> – Out of stock</a>
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
  name: 'Products',
  created: async function(){

    document.title = "Sunscreens"

    this.dangerMessage = false;

    this.accessToken = localStorage.getItem("access_token");
    console.log(this.accessToken)

    // brands list
    let search = await axios.get(BASE_API_URL + 'products');
    // this.brands = brandsList.data;
    console.log(search.data);

    this.products = search.data.products;
    this.brands = search.data.brands;
    this.countries = search.data.countries;
    this.types = search.data.types;

    // let empty = [];
    // this.$store.commit("emptyProducts", empty);
    // console.log(this.$store.state.products)

    // for (let i=0; i<this.products.length;i++){

    //     let productInfo = {
    //       'id': this.products[i].id,
    //       'stockNo': this.products[i].stock_no
    //     }

    //     this.$store.commit("addProducts", productInfo);
    // }
    // console.log(this.$store.state.products)

  },
  data: function(){
    return{
      'name': '',
      'brand': 0,
      'brands': [],
      'country': 0,
      'countries': [],
      'type': 0,
      'types': [],
      'products': [],
      'accessToken': 'yes',
      'user_id':'',
      'dangerMessage':false,
      'noOfClicks': 0
    }
  },
  methods:{
    viewThisProduct: function(productId){
      // this.$emit('view-product', productId);
      // this.$store.commit("addProductId", productId);
      // console.log(productId)
      // console.log(this.$store.state.product)

      localStorage.setItem("product_id", productId);

      this.$router.push({ path: `/products/${productId}`}); // set current route
    },
    addToCart: async function(productId, stockNo){

      if(this.accessToken){
        // console.log("user is logged in")

        if(this.$store.getters.getCartLength && stockNo != 0){
          let prevCartLength = parseInt(this.$store.getters.getCartLength);
          this.$store.commit("updateCartLength", prevCartLength + 1);
          console.log('updated cart length from store: ' + this.$store.getters.getCartLength)
        }
        // localStorage.setItem("cart_length", prevCartLength + 1);

        else if (stockNo != 0) {
          this.$store.commit("updateCartLength", 1);
          console.log('updated cart length from store: ' + this.$store.getters.getCartLength)
        }

        this.$emit("cart", this.$store.getters.getCartLength)


        // localStorage.setItem("stock_no", stockNo); 
        this.user_id = localStorage.getItem("user_id"); 
        console.log(this.user_id)
        
        // let response = await axios.post(BASE_API_URL + productId + '/add',{
        //   'user_id': this.user_id
        // });

        if (stockNo != 0){
          let response = await axios.post(BASE_API_URL + 'cart/' + productId + '/add', {
            'user_id': this.user_id,
            'quantity_to_add': 1
          });
          console.log("added to cart")
          console.log(response.data)
        } else{
          console.log("0 in stock")
          this.dangerMessage = true;
        }


      } else{
          localStorage.setItem("danger_message", "Please log in or register to add to cart");
          // window.location.href="/login"
          this.$router.push('/login');
      }

    },
    search: async function(){      

      let uppercaseName;
      if(this.name){

        if (this.name.includes(" ")){
          let words = this.name.split(" ");
          // console.log(words)
          let newWords = [];

          for (let i=0; i<words.length; i++){
            uppercaseName = words[i][0].toUpperCase() + words[i].substring(1);
            newWords.push(uppercaseName)
            // console.log(uppercaseName)
          }

          // console.log(newWords)

          uppercaseName = newWords.join(" ")
          console.log(uppercaseName)
        } else {
          uppercaseName = this.name[0].toUpperCase() + this.name.substring(1);
          console.log(uppercaseName)
        }
      }
      
      let response = await axios.post(BASE_API_URL + 'products/search', {
        'name': uppercaseName,
        'brand_id': this.brand,
        'country_id': this.country,
        'type_id': this.type,
      })

      console.log(response);

      this.products = response.data.products;

      this.name = "";
      this.brand = 0;
      this.country = 0;
      this.type = 0;

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
  /* border:0; */
  padding:0;
  border:3px solid #1050ff;
  border-radius:25px;
  /* padding:20px; */
  /* box-shadow: 3px 3px 0 #1050ff; */
  overflow:hidden;
}

.card:hover{
  cursor: pointer;
  box-shadow: 0 3px 15px rgb(16, 80, 255, 0.1);
}

.card img{
  width:100%;
  /* border:3px solid #1050ff; */
  border-radius:25px;
}

.image-box{
  width:100%;
  box-sizing: border-box;
  padding:20px 20px 10px 20px;
}

.buttons-box{
  width:100%;
  box-sizing: border-box;
  padding:0 20px 20px 20px;
}

.name-cost-box{
  background-color:#ffdf29;
  color: #1050ff;
  padding:15px 20px;
  border-bottom:3px solid #1050ff;
}

h5{
  margin:0;
  font-weight:700;
}

.cost{
  font-weight:700;
}

.btn{
  width:100%;
}

.search-form div{
  flex:1;
}

</style>
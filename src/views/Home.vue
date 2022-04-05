<template>
    <div class="bg-container">

      <div class="uv-index">
        <h4>{{this.uv_timestamp}}</h4>
        <p>
          Singapore
          <br>
          <b>UV Index: {{this.uv_index}}</b>
        </p>
        <div class="d-none d-lg-block w-75 mb-3 m-auto mini-reminder">
          <i class="fa-solid fa-circle-exclamation"></i> Always use a minimum of SPF 30
        </div>
      </div>

      <div class="d-block d-lg-none text-center mb-3 mini-reminder">
        <i class="fa-solid fa-circle-exclamation"></i> Always use a minimum of SPF 30
      </div>
        
      <img src="@/assets/images/home-bg.png" alt="">

      <div class="sun">
        <img src="@/assets/images/sunray.png" class="sunray" alt="">
        <img src="@/assets/images/sun.png" alt="">
      </div>

      <div class="main-text">
        <h3>where we bring you the latest SPF products from around the world</h3>
      </div>


    </div>
</template>

<script>
import axios from 'axios';

export default{
  name: 'Home',
  mounted: async function(){

    document.title = "Sunny Central";

    let response = await axios.get('https://api.data.gov.sg/v1/environment/uv-index');
    console.log(response)

    this.uv_index = response.data.items[0].index[0].value;
    let timestamp = new Date(response.data.items[0].index[0].timestamp)
    // console.log(String(timestamp).split(" ", 5))
    // let test = timestamp;
    // let date = String(timestamp).split(" ", 3).join(" ");
    // let time = `${timestamp.getHours()} ${timestamp.getMinutes()} ${timestamp.getSeconds()}`
    // this.uv_timestamp = `${date} ${time}`
    this.uv_timestamp = String(timestamp).split(" ", 3).join(" ");
    // this.uv_timestamp = `${timestamp.getDate()} ${timestamp.getMonth()} ${timestamp.getFullYear()}`

  },
  data:function(){
    return {
      'uv_index': '',
      'uv_timestamp': ''
    }
  }
}
</script>

<style scoped>

.bg-container{
  /* background-color:pink; */
  position:relative;
  /* margin-top:100px; */
  /* background-image:url('../assets/images/home-bg.png'); */
  /* background-repeat:no-repeat; */
  /* background-size:contain; */
}

.bg-container img{
  width:100%;
  pointer-events:none;
}

.sun{  
  position:relative;
  top:20px;
  /* left:5%; */
  /* right:5%; */
  margin:auto;
  width: 90%;
}

.sun img{
  /* background-color:pink !important; */
  border-radius:40%;
  position:absolute;
  top:0;
  left:0;
  margin:auto;
}

.sunray{
  animation-name:sunray;
  animation-duration: 10s;
  /* animation-delay:2s; */
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes sunray{
  0%{transform:rotate(0deg)}
  100%{transform:rotate(360deg)}
}

.mini-reminder{
  font-size:13px;
  line-height:15px !important;
  color:#1050ff;
}

.main-text{
  margin-top:430px;
  width:100%;
  /* background-color:blue; */
  text-align:center;
}

.uv-index{
  width:100%;
  margin:auto;
  border:5px solid #1050ff;
  border-radius:25px;
  text-transform: capitalize;
  display:flex;
  flex-direction: row;
  text-align:center;
  overflow:hidden;
  margin-bottom:15px;
  line-height:24px;
}

.uv-index h4{
  flex:1;
  width:100%;
  color:white;
  background-color:#1050ff;
  padding:10px 15px;
  margin:0;
  display:flex;
  align-items: center;
  justify-content: center;
}

.uv-index p{
  flex:1.5;
  color:#1050ff;
  margin:0;
  padding:15px;
  font-size:20px;
}

@media only screen and (min-width:768px){

  .main-text{
    width:60%;
    margin:auto;
    margin-top:600px;
  }

}

@media only screen and (min-width:992px){

  .bg-container{
    margin-top:70px;
    margin-bottom:70px;
  }

  .sun{
    position:absolute;
    top:-50px;
    left:0;
    right:0;
    margin:auto;
    width: 55%;
  }

  .main-text{
    width:40%;
    margin:0;
    margin-top:20px;
    margin-left:auto;
    text-align:right;
  }

  .uv-index{
    position:absolute;
    top:0;
    right:0;
    width:200px;
    border:5px solid #1050ff;
    border-radius:25px;
    overflow:hidden;
    text-align:center;
    text-transform: capitalize;
    display:block;
  }

  .uv-index h4{
    display:block;
  }

    
}

</style>
<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link" to="/about">About Us</router-link>
            <router-link class="nav-link" to="/products">Products</router-link>
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </div>
        </div>

        <div class="ml-auto">
          <a href="/register" class="btn">Register</a>
          <a href="/login" class="btn btn-primary">Login</a>
        </div>


      </div>
    </nav>

    <div class="container mt-4">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

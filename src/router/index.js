import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import AboutUs from "@/views/AboutUs";
import Products from "@/views/Products";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "AboutUs",
    component: AboutUs
  },
  {
    path: "/products",
    name: "Products",
    component: Products
  }
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes
});

export default router;

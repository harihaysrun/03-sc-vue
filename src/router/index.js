import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import AboutUs from "@/views/AboutUs";
import Products from "@/views/Products";
import Contact from "@/views/Contact";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Profile from "@/views/Profile";

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
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  }
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes
});

export default router;

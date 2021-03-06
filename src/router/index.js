import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import Products from "@/views/Products";
import Contact from "@/views/Contact";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Profile from "@/views/Profile";
import ProfileEdit from "@/views/ProfileEdit";
import AddressEdit from "@/views/AddressEdit";
import PasswordEdit from "@/views/PasswordEdit";
import ProductInfo from "@/views/ProductInfo";
// import ProductInfo from "@/components/product-info";
import Cart from "@/views/Cart";
import Checkout from "@/views/Checkout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
  },
  {
    path: "/profile/edit",
    name: "ProfileEdit",
    component: ProfileEdit
  },
  {
    path: "/profile/address/edit",
    name: "AddressEdit",
    component: AddressEdit
  },
  {
    path: "/profile/password/edit",
    name: "PasswordEdit",
    component: PasswordEdit
  },
  {
    path: "/products/:product_id",
    name: "ProductInfo",
    component: ProductInfo,
    // props: true
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/checkout/success/:id",
    name: "Checkout",
    component: Checkout
  }
];

const router = new VueRouter({
  mode: "history",
  base: "",
  routes
});

export default router;

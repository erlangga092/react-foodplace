import store from "./store";
import { saveCart } from "../api/cart";

let currentAuth;
let currentCart;

function listener() {
  let previousAuth = currentAuth;
  let previousCart = currentCart;

  currentAuth = store.getState().auth;
  currentCart = store.getState().cart;

  const { token } = currentAuth;

  if (currentAuth !== previousAuth) {
    window.localStorage.setItem("auth", JSON.stringify(currentAuth));
  }

  if (currentCart !== previousCart) {
    window.localStorage.setItem("cart", JSON.stringify(currentCart));
    saveCart(token, currentCart);
  }
}

function listen() {
  store.subscribe(listener);
}

export { listen };

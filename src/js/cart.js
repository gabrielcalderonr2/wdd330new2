import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map(cartItemTemplate);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

const cart = getLocalStorage("so-cart") || [];

const subtotal = cart.reduce(
  (sum, item) => sum + item.FinalPrice * item.qty,
  0
);

const subtotalEl = document.querySelector("#cart-subtotal");
if (subtotalEl) {
  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__quantity">qty: ${item.qty}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

renderCartContents();
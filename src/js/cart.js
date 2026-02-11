import { getLocalStorage } from "./utils.mjs";

// Safely get image URL
function getImageUrl(item) {
  const base = import.meta.env.VITE_SERVER_URL;

  if (item.Images && item.Images.PrimaryMedium) {
    return base + item.Images.PrimaryMedium;
  }

  if (item.Image) {
    return base + item.Image;
  }

  return "";
}


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__quantity">qty: ${item.qty}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();

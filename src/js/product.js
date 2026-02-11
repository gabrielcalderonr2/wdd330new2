import { setLocalStorage, getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();

const dataSource = new ProductData();

// Get product id from URL
const productId = getParam("product");

// Add product to cart
function addProductToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  cartItems.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
}

// Add to cart button handler
async function addToCartHandler() {
  const product = await dataSource.findProductById(productId);
  addProductToCart(product);
}

// Initialize product page
async function init() {
  const product = await dataSource.findProductById(productId);

  // Render product details
  document.querySelector(".product-detail").innerHTML = `
    <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
    <h2>${product.Name}</h2>
    <p>${product.Description}</p>
    <p>$${product.FinalPrice}</p>
    <button id="addToCart">Add to Cart</button>
  `;

  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

init();

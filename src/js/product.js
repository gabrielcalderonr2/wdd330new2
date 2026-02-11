import {
  loadHeaderFooter,
  getParam,
  updateCartCount,
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData();

// Setup page (load header and update counter)
async function setupPage() {
  await loadHeaderFooter();
  updateCartCount();
}

setupPage();

// Get product id from URL
const productId = getParam("product");

// Add product to cart
function addProductToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  const existingProduct = cartItems.find(
    (item) => item.Id === product.Id
  );

  if (existingProduct) {
    existingProduct.qty += 1;
  } else {
    const productToStore = {
      Id: product.Id,
      Name: product.Name,
      FinalPrice: product.FinalPrice,
      Image: product.Images.PrimaryMedium,
      qty: 1,
    };

    cartItems.push(productToStore);
  }

  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  updateCartCount();
}


// Initialize product page
async function init() {
  const product = await dataSource.findProductById(productId);

  const productSection = document.querySelector(".product-detail");

  productSection.innerHTML = `
    <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
    <h2>${product.Name}</h2>
    <p>${product.Description || ""}</p>
    <p>$${product.FinalPrice}</p>
    <button id="addToCart">
      Add to Cart
    </button>
  `;

  document
    .getElementById("addToCart")
    .addEventListener("click", () => {
      addProductToCart(product);
    });
}

init();

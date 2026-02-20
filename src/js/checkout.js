import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer so navigation works
loadHeaderFooter();

// Initialize checkout process
const checkoutProcess = new CheckoutProcess("so-cart", "#order-summary");
checkoutProcess.init();

// Handle form submission
const form = document.querySelector("#checkout-form");

form.addEventListener("submit", async e => {
  e.preventDefault();
  checkoutProcess.calculateOrderTotal();
  const response = await checkoutProcess.checkout(form);
  console.log("Server response:", response);
});
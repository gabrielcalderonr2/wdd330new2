import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.services = new ExternalServices();
  }

  // Called when the page loads
  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  // Calculate subtotal from cart items
  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * item.qty,
      0
    );

    const subtotalEl = document.querySelector(
      `${this.outputSelector} #subtotal`
    );

    if (subtotalEl) {
      subtotalEl.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  // Calculate tax, shipping and total
  calculateOrderTotal() {
    // Tax = 6%
    this.tax = this.itemTotal * 0.06;

    // Shipping: $10 first item + $2 each extra item
    const itemCount = this.list.reduce(
      (sum, item) => sum + item.qty,
      0
    );
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  // Display totals in the summary box
  displayOrderTotals() {
    document.querySelector(
      `${this.outputSelector} #tax`
    ).textContent = `$${this.tax.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #shipping`
    ).textContent = `$${this.shipping.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #orderTotal`
    ).textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  // Convert cart items to server format
  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.qty
    }));
  }

  // Called when form is submitted
  async checkout(form) {
    try {
      // Get form data
      const formData = new FormData(form);
      const order = Object.fromEntries(formData.entries());

      // Add required server fields
      order.orderDate = new Date().toISOString();
      order.items = this.packageItems(this.list);
      order.orderTotal = this.orderTotal;
      order.shipping = this.shipping;
      order.tax = this.tax.toFixed(2);

      // Send order to server
      await this.services.checkout(order);

      // Success: clear cart and go to success page
      localStorage.removeItem("so-cart");
      window.location.href = "/checkout/success.html";

    } catch (err) {
      // Handle server validation errors
      if (err.name === "servicesError") {
        Object.values(err.message).forEach(msg => {
          alertMessage(msg);
        });
      } else {
        alertMessage("Checkout failed. Please try again.");
      }
    }
  }
}
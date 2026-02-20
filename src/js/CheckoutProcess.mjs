import { getLocalStorage } from "./utils.mjs";
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
  }

  // Called when the page loads
  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  // Calculate cart subtotal
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

  // Calculate tax, shipping, and total
  calculateOrderTotal() {
    const itemCount = this.list.reduce(
      (sum, item) => sum + item.qty,
      0
    );

    this.tax = this.itemTotal * 0.06;
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  // Display totals in the order summary
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

  // Prepare cart items for checkout
  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.qty
    }));
  }

  // Submit order to the server
  async checkout(form) {
    const formData = new FormData(form);
    const order = {};

    formData.forEach((value, key) => {
      order[key] = value;
    });

    order.orderDate = new Date().toISOString();
    order.items = this.packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;

    const service = new ExternalServices();
    return await service.checkout(order);
  }
}
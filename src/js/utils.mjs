// Render a single template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

// Render a list of items using a template function
export function renderListWithTemplate(templateFn, parentElement, data, callback) {
  parentElement.innerHTML = "";

  data.forEach((item) => {
    parentElement.insertAdjacentHTML("beforeend", templateFn(item));
  });

  if (callback) {
    callback(data);
  }
}

// Load HTML template file
export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}

// Load header and footer dynamically
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  if (headerElement) {
    headerElement.innerHTML = headerTemplate;
  }

  if (footerElement) {
    footerElement.innerHTML = footerTemplate;
  }

  // Update cart counter after header is inserted
  updateCartCount();
}

// Get data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Set data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get URL parameter
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Update cart count in header
export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const countElement = document.getElementById("cart-count");

  if (!countElement) return;

  const total = cartItems.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  countElement.textContent = total > 0 ? total : "";
}

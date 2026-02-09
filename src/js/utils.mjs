export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
// Load html template file
export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}

// Render one template
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  // Optional callback
  if (callback) {
    callback(data);
  }
}

// Load header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("./partials/header.html");
  const footerTemplate = await loadTemplate("./partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  if (headerElement) {
    renderWithTemplate(headerTemplate, headerElement);
  }

  if (footerElement) {
    renderWithTemplate(footerTemplate, footerElement);
  }
}

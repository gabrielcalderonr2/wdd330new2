const baseURL = import.meta.env.VITE_SERVER_URL;

// Convert response to JSON
async function convertToJson(res) {
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  // Get products by category
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Get single product by id
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}

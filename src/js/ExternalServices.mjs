const baseURL = "https://wdd330-backend.onrender.com";

export default class ExternalServices {
  constructor() {}

  // Send checkout order to the server
  async checkout(order) {
    const url = `${baseURL}/checkout`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Checkout request failed");
    }

    return await response.json();
  }
}
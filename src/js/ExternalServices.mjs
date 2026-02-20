const baseURL = "https://wdd330-backend.onrender.com";

export default class ExternalServices {
  async checkout(order) {
    const url = `${baseURL}/checkout`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    const response = await fetch(url, options);

    // 👇 CLAVE: leer el body SIEMPRE
    const jsonResponse = await response.json();

    if (!response.ok) {
      // enviar el error real al CheckoutProcess
      throw {
        name: "servicesError",
        message: jsonResponse,
      };
    }

    return jsonResponse;
  }
}
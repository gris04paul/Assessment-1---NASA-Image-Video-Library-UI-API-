class ApiHelper {
  constructor(request) {
    this.request = request;
    this.baseUrl = 'https://images-api.nasa.gov';
  }

  async search(term) {
    const response = await this.request.get(`${this.baseUrl}/search?q=${term}`);

    const data = await response.json();

    const firstItem = data.collection.items[0].data[0];

    console.log('API Title:', firstItem.title);
    console.log('NASA ID from API:', firstItem.nasa_id);

    return firstItem;
  }

  async getAsset(nasaId) {
    console.log('Calling API with NASA ID:', nasaId);

    const response = await this.request.get(
      `${this.baseUrl}/asset/${nasaId}`
    );

    console.log('Status:', response.status());

   /* const data = await response.json();

    // ✅ SAFETY CHECK
    if (!data.collection || !data.collection.items) {
      throw new Error(`Invalid API response for NASA ID: ${nasaId}`);
    }

    console.log('Asset Links Count:', data.collection.items.length);

    return data;*/
  }
}

module.exports = { ApiHelper };
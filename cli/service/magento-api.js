import fetch from 'node-fetch';

export default class MagentoApi {
    constructor() {
        this.baseUrl = process.env.BASE_URL;
    }

    async sendGet(endpoint) {
        const url = `${this.baseUrl}/${endpoint}`;

        const response = await fetch(url);

        return response.json();
    }

    async sendPost(endpoint, formData) {
        return this.sendRequest(
            endpoint,
            {
                method: 'POST',
                body: formData
            }
        );
    }

    async sendPut(endpoint, data) {
        return this.sendRequest(
            endpoint,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }
        );
    }

    sendRequest(endpoint, settings) {
        const url = `${this.baseUrl}/${endpoint}`;
        return fetch(url, settings);
    }
}

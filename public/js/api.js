export default class ProductAPI {
    constructor() {
        this.baseURL = "http://127.0.0.1:3000/api/products";
    }

    async getAll() {
        const response = await fetch(this.baseURL);
        const status = response.status;
        const products = await response.json();
        return { status, products };
    }

    async get(id) {
        const response = await fetch(`${this.baseURL}/${id}`);
        const status = response.status;
        const product = await response.json();
        return { status, product };
    }

    async post(product) {
        const response = await fetch(this.baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        const status = response.status;
        const { message, product: newProduct } = await response.json();
        return { status, message, product: newProduct };
    }

    async put(id, product) {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        const status = response.status;
        const { message, product: updatedProduct } = await response.json();
        return { status, message, product: updatedProduct };
    }

    async patch(id, partial) {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(partial),
        });
        const status = response.status;
        const { message, product: patchedProduct } = await response.json();
        return { status, message, product: patchedProduct };
    }

    async delete(id) {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: "DELETE",
        });
        const status = response.status;
        const { message } = await response.json();
        return { status, message };
    }
}

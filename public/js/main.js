import ProductAPI from "./api.js";

const api = new ProductAPI();
console.warn(`Esta prueba está seteada para conectarse a la URL ${api.baseURL}`)

// Tomar valores del form
const inputId = document.getElementById("productId");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputBrand = document.getElementById("brand");
const inputCategory = document.getElementById("category");
const inputShortDesc = document.getElementById("shortDescription");
const inputLongDesc = document.getElementById("longDescription");
const inputFreeShipping = document.getElementById("freeShipping");
const inputMainPhoto = document.getElementById("mainPhoto");

// Helper para armar el objeto completo
function buildProductObject() {
    return {
        name: inputName.value.trim(),
        price: parseFloat(inputPrice.value),
        stock: parseInt(inputStock.value, 10),
        brand: inputBrand.value.trim(),
        category: inputCategory.value.trim(),
        shortDescription: inputShortDesc.value.trim(),
        longDescription: inputLongDesc.value.trim(),
        freeShipping: inputFreeShipping.checked,
        mainPhoto: inputMainPhoto.value.trim(),
    };
}

// Helper para armar objeto parcial (sólo campos no vacíos)
function buildPatchObject() {
    const partial = {};
    if (inputName.value.trim()) {partial.name = inputName.value.trim()};
    if (inputPrice.value) partial.price = parseFloat(inputPrice.value);
    if (inputStock.value) partial.stock = parseInt(inputStock.value, 10);
    if (inputBrand.value.trim()) partial.brand = inputBrand.value.trim();
    if (inputCategory.value.trim()) partial.category = inputCategory.value.trim();
    if (inputShortDesc.value.trim()) partial.shortDescription = inputShortDesc.value.trim();
    if (inputLongDesc.value.trim()) partial.longDescription = inputLongDesc.value.trim();
    // Para freeShipping, siempre lo incluimos (true/false)
    partial.freeShipping = inputFreeShipping.checked;
    if (inputMainPhoto.value.trim()) partial.mainPhoto = inputMainPhoto.value.trim();
    return partial;
}

// GET ALL
document.getElementById("btnGetAll").addEventListener("click", async () => {
    const { status, products } = await api.getAll();
    console.log("products:", products, "status:", status);
});

// GET ONE
document.getElementById("btnGet").addEventListener("click", async () => {
    const id = prompt("Ingresá el ID del producto:");
    if (!id) return;
    const { status, product } = await api.get(id);
    console.log("product:", product, "status:", status);
});

// DELETE
document.getElementById("btnDelete").addEventListener("click", async () => {
    const id = prompt("Ingresá el ID del producto a eliminar:");
    if (!id) return;
    const { status, message } = await api.delete(id);
    console.log("message:", message, "status:", status);
});

// CREATE
document.getElementById("btnCreate").addEventListener("click", async () => {
    const product = buildProductObject();
    const { status, message, product: newProduct } = await api.post(product);
    console.log("message:", message, "product:", newProduct, "status:", status);
});

// REPLACE (PUT)
document.getElementById("btnReplace").addEventListener("click", async () => {
    const id = inputId.value.trim();
    if (!id) return;
    const product = buildProductObject();
    const { status, message, product: updatedProduct } = await api.put(id, product);
    console.log("message:", message, "product:", updatedProduct, "status:", status);
});

// EDIT (PATCH)
document.getElementById("btnEdit").addEventListener("click", async () => {
    const id = inputId.value.trim();
    if (!id) return;
    const partial = buildPatchObject();
    const { status, message, product: patchedProduct } = await api.patch(id, partial);
    console.log("message:", message, "product:", patchedProduct, "status:", status);
});

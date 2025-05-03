const products = [];

class ProductModelMem {

    getNextId = () => (Number(products[products.length - 1]?.id || 0) + 1).toString();

    getProducts = async () => {
        return products;
    };

    getProduct = async id => products.find((product) => product.id === id);

    createProduct = async product => {
        product.id = this.getNextId();
        products.push(product);
        return product;
    };

    updateProduct = async (id, product) => {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }

        const updatedProduct = {...product, id};
        products[index] = updatedProduct;
        return updatedProduct;
    };

    patchProduct = async (id, partialProduct) => {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return null;
        }

        const updatedProduct = {...products[index], ...partialProduct, id};
        products[index] = updatedProduct;
        return updatedProduct;
    };

    deleteProduct = async id => {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
        return null;
        }
        
        const deletedProduct = products.splice(index, 1)[0];
        return deletedProduct;
    };

}

export default ProductModelMem;
